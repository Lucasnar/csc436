#pragma downcast

var player : GameObject;

function OnTriggerEnter2D(other : Collider2D){

	var keyScript : MovePlayer = player.GetComponent(MovePlayer);
	var enterDoorText : GameObject = gameObject.Find("EnterDoorText");

	if(other.gameObject.tag == "Door1" && keyScript.key1obtained)
	{
		
		Destroy(other.gameObject);
		Destroy(gameObject.Find("GetTheKeyText"));
		keyScript.pressZToActiveEvent = false;
		enterDoorText.GetComponent(UI.Text).color.a = 1;
		keyScript.key1obtained = false;
		gameObject.Find("DoorSound").audio.Play();
		gameObject.Find("Key_1Image").GetComponent(UI.Image).color.a = 0;
		keyScript.StopControl();
		
		if (Application.loadedLevelName == "Scene_1") {
			
			yield WaitForSeconds(8);
			Application.LoadLevel("Scene_2");
		
		}
		
		else if (Application.loadedLevelName == "Scene_2") {
			
			yield WaitForSeconds(8);
			Application.LoadLevel("Scene_3");
		
		}
		
		else if (Application.loadedLevelName == "Scene_3") {
		
			gameObject.Find("AllLavas").GetComponent(Animator).SetBool("LavaGoingUp", true);
			yield WaitForSeconds(8);
			Application.LoadLevel("Scene_4");
		
		}
		else if (Application.loadedLevelName == "Scene_4"){
		
			gameObject.Find("FirstMusic_v2").audio.Play();
			yield WaitForSeconds(15);
			gameObject.Find("Blackground").GetComponent(UI.Image).color.a = 1;
			gameObject.Find("CreditsText").GetComponent(UI.Text).color.a = 1;
			gameObject.Find("Heart1").GetComponent(UI.Image).color.a = 0;
			gameObject.Find("Heart2").GetComponent(UI.Image).color.a = 0;
			gameObject.Find("Heart3").GetComponent(UI.Image).color.a = 0;
			keyScript.EnableButtons();
			yield WaitForSeconds(600);
			gameObject.Find("Blackground").GetComponent(UI.Image).color.a = 0;
			gameObject.Find("CreditsText").GetComponent(UI.Text).color.a = 0;
			keyScript.DisableButtons();
			gameObject.Find("Warrior_0").transform.position = Vector3(100, 100, 10);
			gameObject.Find("AreYouStillHereText").GetComponent(UI.Text).color.a = 1;
			enterDoorText.GetComponent(UI.Text).color.a = 0;
			
		}
		
		keyScript.StartControl();
	}
	
	if(other.gameObject.tag == "Lever"){
		
		var leverPosition : Vector3 = other.transform.position;
		Destroy(other.gameObject);
		gameObject.Find("Lever_1").transform.position = leverPosition;
		gameObject.Find("DoorSound").audio.Play();
		gameObject.Find("Chains").GetComponent(Animator).SetBool("LeverPulled", true);
		
		
	}
}