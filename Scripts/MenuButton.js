#pragma strict

function OnMouseDown(){
	
	if (gameObject.name == "StartButton"){
	
		Application.LoadLevel("Scene_1");
		Time.timeScale = 1;
	
	}
	
	if (gameObject.name == "QuitButton"){
	
		Application.Quit();
	
	}

}