#pragma downcast

var player : GameObject;

function OnTriggerEnter2D(other : Collider2D){

	var keyScript : MovePlayer = player.GetComponent(MovePlayer);
	var enterDoorText : GameObject = gameObject.Find("EnterDoorText");

	if(other.tag == "Door1" && keyScript.key1obtained)
	{
		
		Destroy(other.gameObject);
		enterDoorText.GetComponent(UI.Text).color.a = 1;
		keyScript.key1obtained = false;
		gameObject.Find("DoorSound").audio.Play();
		gameObject.Find("Key_1Image").GetComponent(UI.Image).color.a = 0;
		keyScript.StopControl();
		yield WaitForSeconds(5);
		
		if (Application.loadedLevelName == "Scene_1") {
		
			Application.LoadLevel("Scene_2");
		
		}
		
		if (Application.loadedLevelName == "Scene_2") {
		
			
			keyScript.EnableButtons();
			yield WaitForSeconds(600);
			keyScript.DisableButtons();
			gameObject.Find("Warrior_0").transform.position = Vector3(100, 100, 100);
			gameObject.Find("AreYouStillHereText").GetComponent(UI.Text).color.a = 1;
			enterDoorText.GetComponent(UI.Text).color.a = 0;
		}
		
		keyScript.StartControl();
	}
}