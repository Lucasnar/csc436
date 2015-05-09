#pragma strict

function OnTriggerEnter2D(other : Collider2D){

	if (other.gameObject.tag == "ActiveSecondProjectile"){
		
		gameObject.Find("Projectile2").GetComponent(Animator).SetBool("ProjectileActive", true);
	}
}