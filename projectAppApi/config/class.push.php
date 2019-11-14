<?php
	/**
	***		Create by Srikee Eadtrong
	***		From PSU Pattani
	***		Version 1.0.0
	**/
	class Push {
		private $app_id = "";		// ONESIGNAL APP ID
		private $api_key = "";		// ONESIGNAL REST API KEY
		public function __construct($app_id, $api_key) {
			$this->app_id = $app_id;
			$this->api_key = $api_key;
		}
		public function sendPlayerIds($arrPlayerIds, $objMessage) { //$arrPlayerIds = array("...","...")
			//print_r($arrPlayerIds);
			$arrayChunk = array_chunk($arrPlayerIds, 2000);
			foreach($arrayChunk as $arrPlayerId) {
				$fields = array();
				$fields["include_player_ids"] = $arrPlayerId;
				$this->sender($fields, $objMessage);
			}
		}
		public function sendAll($objMessage) {
			$fields = array();
			$fields["included_segments"] = array('All');
			$this->sender($fields, $objMessage);
		}
		private function sender($fields, $objMessage) {
			$fields["app_id"] = $this->app_id;
			$fields["headings"] = array(
				"en"=>$objMessage["title"]
			);
			$fields["contents"] = array(
				"en"=>$objMessage["message"]
			);
			$fields["data"] = $objMessage;
			$fields["small_icon"] = 'icon';
			$fields["large_icon"] = 'icon';
			$fields["android_group"] = 'push';
			//$fields["send_after"] = "2019-11-04 11:31:00"; //date("Y-m-d H:i:s");
			$fields = json_encode($fields);
			$ch = curl_init();
			curl_setopt($ch, CURLOPT_URL, "https://onesignal.com/api/v1/notifications");
			curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type: application/json; charset=utf-8', 'Authorization: Basic '.$this->api_key));
			curl_setopt($ch, CURLOPT_RETURNTRANSFER, TRUE);
			curl_setopt($ch, CURLOPT_HEADER, FALSE);
			curl_setopt($ch, CURLOPT_POST, TRUE);
			curl_setopt($ch, CURLOPT_POSTFIELDS, $fields);
			curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, FALSE);
			$response = curl_exec($ch);
			curl_close($ch);
			return $response;
		}
	}
