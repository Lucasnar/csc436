#pragma strict

function OnTriggerEnter2D(other : Collider2D){

	if(other.tag == "Enemy")
	{
		Destroy(other.gameObject);
		gameObject.Find("HurtSound").audio.Play();	
	}

}