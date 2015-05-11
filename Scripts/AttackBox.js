#pragma strict

function OnTriggerEnter2D(other : Collider2D){

	if(other.tag == "Enemy")
	{
		Destroy(other.gameObject);
		gameObject.Find("HurtSound").audio.Play();
	}
	
	if(other.tag == "Villain")
	{
		Destroy(other.gameObject);
		gameObject.Find("HurtSound").audio.Play();
		Destroy(gameObject.Find("Projectile1"));
		Destroy(gameObject.Find("Projectile2"));
		
		gameObject.Find("LittleFloorSpecial1").transform.position = Vector3(-0.25, -0.175, 0);
		gameObject.Find("LittleFloorSpecial2").transform.position = Vector3(2.4, -0.175, 0);
		
		gameObject.Find("ThreeProjectiles").collider2D.enabled = true;
		gameObject.Find("ThreeProjectiles2").collider2D.enabled = true;
		gameObject.Find("Villain2").collider2D.enabled = true;
		gameObject.Find("Villain2").GetComponent(SpriteRenderer).color.a = 1;
		
		
		for (var child : Transform in gameObject.Find("ThreeProjectiles").transform) {
    		
    		child.gameObject.GetComponent(SpriteRenderer).color.a = 1;
    	
		}
		
		for (var child : Transform in gameObject.Find("ThreeProjectiles2").transform) {
    		
    		child.gameObject.GetComponent(SpriteRenderer).color.a = 1;
    	
		}

	}
	
	if(other.tag == "Villain2")
	{
		Destroy(other.gameObject);
		gameObject.Find("HurtSound").audio.Play();
		Destroy(gameObject.Find("ThreeProjectiles"));
		Destroy(gameObject.Find("ThreeProjectiles2"));
		
		gameObject.Find("ActiveLastScene").collider2D.enabled = true;
		gameObject.Find("Villain3").collider2D.enabled = true;
		gameObject.Find("Villain3").GetComponent(SpriteRenderer).color.a = 1;

	}
	
	if(other.tag == "Villain3")
	{
		Destroy(other.gameObject);
		gameObject.Find("HurtSound").audio.Play();
		yield WaitForSeconds(0.5);
		gameObject.Find("HurtSound").audio.Play();
		yield WaitForSeconds(0.5);
		gameObject.Find("HurtSound").audio.Play();
		yield WaitForSeconds(0.5);
		gameObject.Find("HurtSound").audio.Play();
		
		gameObject.Find("GoldenKey").collider2D.enabled = true;
		gameObject.Find("GoldenKey").GetComponent(SpriteRenderer).color.a = 1;

	}


}