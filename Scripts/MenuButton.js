#pragma strict
//var player : GameObject;

function OnMouseDown(){

	//var keyScript : MovePlayer = player.GetComponent(MovePlayer);
	
	if (gameObject.name == "StartButton"){
		
		if (gameObject.Find("Warrior_0")){
		
			Destroy(gameObject.Find("Warrior_0"));
		
		}
		
		Application.LoadLevel("Scene_1");
		Time.timeScale = 1;
	
	}/*
	
	else if (gameObject.name == "RestartSceneButton"){
		
		if (Application.loadedLevelName == "Scene_1"){
			if (gameObject.Find("Warrior_0")){
		
				Destroy(gameObject.Find("Warrior_0"));
			}
		}
		
		Application.LoadLevel(Application.loadedLevelName);
	
	}*/
	
	else if (gameObject.name == "QuitButton"){
		
		Application.Quit();
		#if UNITY_EDITOR
     	UnityEditor.EditorApplication.isPlaying = false;
     	#endif
	
	}
	
	

}