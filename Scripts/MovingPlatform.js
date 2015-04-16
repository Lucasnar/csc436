#pragma strict

function OnTriggerEnter2D(other : Collider2D) 
{ 
	// other.transform.parent = gameObject.transform;
	other.transform.SetParent(gameObject.transform, true);
} 

function OnTriggerExit2D(other : Collider2D) 
{
	// other.transform.parent = null;
	other.transform.SetParent(null, true);
}