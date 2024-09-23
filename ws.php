<?php
	error_reporting(E_ALL);
	header('Content-Type: text/html; charset=utf-8');
	$json = ["success" => true, "result" => []];
	
	$mysqli = new mysqli("godhateusbdd.mysql.db", "godhateusbdd", "yq424uqj", "godhateusbdd");
	if ($mysqli->connect_errno) {
		$json["success"] = false;
		$json["message"] = "Echec lors de la connexion à MySQL : (" . $mysqli->connect_errno . ") " . $mysqli->connect_error;
	}
	
	// UTF-8
	$mysqli->query("SET NAMES 'utf8'", $connection);

	$json = ["success" => true, "result" => []];

	if (isset($_REQUEST['action'])) {
		$action = $_REQUEST['action'];

		switch ($action) {
			case 'employees':
				$res = $mysqli->query("SELECT id, firstname, lastname, birthday, signature, signature_date, CASE WHEN picture IS NOT NULL THEN 1 ELSE null END as picture ".
										" FROM employees WHERE active = true ORDER BY firstname, lastname");
				
				while ($row = $res->fetch_assoc()) {
					$json["result"][] = $row;
				}
			break;
			
			case 'rankings':
				$date = $_REQUEST['date'] ? date("Y-m-d", strtotime($_REQUEST['date'])) : date("Y-m-d");
				
				$res = $mysqli->query(
					"SELECT e.id, e.firstname, e.lastname, CASE WHEN e.picture IS NOT NULL THEN 1 ELSE null END as picture, ".
						"COALESCE(SUM(d.couverts), 0) as couverts, COALESCE(SUM(d.boites), 0) as boites, ".
						"COALESCE(SUM(d.cafes), 0) as cafes, COALESCE(SUM(d.verres), 0) as verres, COALESCE(SUM(d.note), 0) as note, ".
						"(1.0 - ((SELECT COUNT(DISTINCT date) FROM missing WHERE employee_id = e.id AND EXTRACT(MONTH FROM date) = '".
						date("n", strtotime($date))."' AND EXTRACT(YEAR FROM date) = '".date("Y", strtotime($date))."') ".
						" / (SELECT COUNT(DISTINCT date) FROM dishes WHERE EXTRACT(MONTH FROM date) = '".
						date("n", strtotime($date))."' AND EXTRACT(YEAR FROM date) = '".date("Y", strtotime($date))."'))) * 100 as presence, ".
						/*"ROUND(COALESCE(SUM(d.note), 0) / (SELECT COUNT(DISTINCT date) FROM dishes WHERE EXTRACT(MONTH FROM date) = '".
						date("n", strtotime($date))."' AND EXTRACT(YEAR FROM date) = '".date("Y", strtotime($date))."'), 1) as note_pondere ".*/
						"ROUND(COALESCE(SUM(d.note), 0) / ((SELECT COUNT(DISTINCT date) FROM dishes WHERE EXTRACT(MONTH FROM date) = '".
						date("n", strtotime($date))."' AND EXTRACT(YEAR FROM date) = '".date("Y", strtotime($date))."') - ".
						"(SELECT COUNT(DISTINCT date) FROM missing WHERE employee_id = e.id AND EXTRACT(MONTH FROM date) = '".
						date("n", strtotime($date))."' AND EXTRACT(YEAR FROM date) = '".date("Y", strtotime($date))."')), 1) as note_pondere ".
					"FROM employees e ".
					"LEFT JOIN dishes d ON e.id = d.employee_id ".
						"AND EXTRACT(MONTH FROM d.date) = '".date("n", strtotime($date))."' ".
						"AND EXTRACT(YEAR FROM d.date) = '".date("Y", strtotime($date))."' ".
					"WHERE e.active = true ".
					"GROUP BY e.id, e.firstname, e.lastname ".
					"ORDER BY note_pondere DESC, e.firstname, e.lastname"
				);
				
				$rank = 1;
				while ($row = $res->fetch_assoc()) {
					$row["rank"] = $rank++;
					$json["result"][] = $row;
				}
			break;
			
			case 'dishes':
				$employeeId = $_REQUEST['employeeId'] ? $_REQUEST['employeeId'] : 0;
				
				$res = $mysqli->query(
					"SELECT d.date, d.id, d.employee_id, e.firstname, e.lastname, d.couverts, d.boites, d.cafes, d.verres, d.note ".
					"FROM dishes d ".
					"LEFT JOIN employees e ON e.id = d.employee_id ".
					"WHERE e.id = ".$employeeId.
					" ORDER BY d.date DESC"
				);
				
				while ($row = $res->fetch_assoc()) {
					$json["result"][] = $row;
				}
			break;
		  
			case 'savedishes':
				// Calcule de la note
				$employeId = $_REQUEST['employe'];
				$couverts = $_REQUEST['couverts'];
				$boites = $_REQUEST['boites'];
				$cafes = $_REQUEST['cafes'];
				$verres = $_REQUEST['verres'];
				$absIds = explode(',', $_REQUEST['absents']);
				
				$note = ($couverts * 1) + ($boites * 0.8) + ($cafes * 0.3) + ($verres * 1.5);
			
				// Ajout de la ligne de vaisselle
				if (!$mysqli->query("INSERT INTO dishes (date, employee_id, couverts, boites, cafes, verres, note) VALUES (NOW(), $employeId, $couverts, $boites, $cafes, $verres, $note)")) {
					echo "Erreur d'insertion du disher : (" . $mysqli->errno . ") " . $mysqli->error;
				}

				// Ajout des absents dans la table
				if (isset($_REQUEST['absents']) && $_REQUEST['absents'] != '') {
					$absIds = strpos($_REQUEST['absents'], ',') !== false ? explode(',', $_REQUEST['absents']) : [$_REQUEST['absents']];
					foreach($absIds as $absId) {
						if (!$mysqli->query("INSERT IGNORE INTO missing (date, employee_id) VALUES (NOW(), $absId)")) {
							echo "Erreur d'insertion des absents : (" . $mysqli->errno . ") " . $mysqli->error;
						}
					}
				}
				
				// Retourne la note
				$json["result"]["note"] = $note;
			break;
			
			case 'birthday':
				$res = $mysqli->query("SELECT id, firstname, lastname, birthday, TIMESTAMPDIFF(YEAR, birthday, CURDATE()) as age ".
						"FROM employees WHERE DATE_ADD(birthday, INTERVAL YEAR(CURDATE())-YEAR(birthday) YEAR) ".
						"BETWEEN CURDATE() AND DATE_ADD(CURDATE(), INTERVAL 7 DAY)");
				
				while ($row = $res->fetch_assoc()) {
					$json["result"][] = $row;
				}
			break;
			
			case 'picture':
				header('Content-type: image/png');
				
				$employeeId = $_REQUEST['employeeId'] ? $_REQUEST['employeeId'] : 0;
				$res = $mysqli->query("SELECT picture FROM employees WHERE id = $employeeId");
				
				while ($row = $res->fetch_assoc()) {
					echo $row['picture'];
				}
			break;
			
			case 'broken':
				$employeeId = $_REQUEST['employeeId'] ? $_REQUEST['employeeId'] : 0;

				$res = $mysqli->query("SELECT MAX(id) as id, COALESCE(SUM(note), 0) as note FROM dishes WHERE employee_id = $employeeId GROUP BY date ORDER BY date DESC LIMIT 1");
				$row = $res->fetch_assoc();
				$note = $row['note'] == 0 ? 10 : $row['note'];
				$lost = rand(1, $note);
				$newNote = $note - $lost;
				
				$json["result"]["note"] = $note;
				$json["result"]["lost"] = $lost;
				$json["result"]["newNote"] = round($newNote, 1);

				// Ajout de la ligne de casse
				$mysqli->query("INSERT INTO dishes (date, employee_id, couverts, boites, cafes, verres, note) VALUES (NOW(), $employeeId, 0, 0, 0, 0, ($lost*-1))");
				
			break;
			
			case 'signature':
				$employeeId = $_REQUEST['employeeId'] ? $_REQUEST['employeeId'] : 0;
				$signature = $_REQUEST['signature'] ? $_REQUEST['signature'] : '';

				$mysqli->query("UPDATE employees SET signature = '$signature', signature_date = CURDATE() WHERE id = $employeeId");
			break;
		}
	}

	
	echo json_encode($json);

?>

