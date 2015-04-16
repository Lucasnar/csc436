#pragma strict

function Start () {

	while (gameObject.GetComponent(UI.Image).color.a >	 0){
	
		gameObject.GetComponent(UI.Image).color.a -= 0.1;
		yield WaitForSeconds(0.13);
	
	}
	Destroy(gameObject);

}