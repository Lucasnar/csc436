#pragma strict

function OnTriggerEnter2D(other : Collider2D){

	if(other.tag == "Door1")
	{
		Destroy(other.gameObject);
	}

}