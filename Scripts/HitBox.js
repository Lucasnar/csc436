#pragma downcast

var player : GameObject;

function OnTriggerEnter2D(other : Collider2D){

	var keyScript : MovePlayer = player.GetComponent(MovePlayer);

	if(other.tag == "Door1" && keyScript.key1obtained)
	{
		Destroy(other.gameObject);
		
		keyScript.key1obtained = false;
		gameObject.Find("DoorSound").audio.Play();
		gameObject.Find("Key_1Image").GetComponent(UI.Image).color.a = 0;
		Application.LoadLevel("Scene_2");
	}
}