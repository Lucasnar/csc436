#pragma strict

function OnMouseDown(){
	
	if (gameObject.name == "StartButton"){
		
		if (gameObject.Find("Warrior_0")){
		
			Destroy(gameObject.Find("Warrior_0"));
		
		}
		
		Application.LoadLevel("Scene_1");
		Time.timeScale = 1;
	
	}
	
	if (gameObject.name == "QuitButton"){
		
		Application.Quit();
	
	}

}