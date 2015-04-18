#pragma strict

var dampTime : float = 0.5;
var velocity = Vector3.zero;
var target : Transform;

function Start(){
	
	gameObject.Find("Warrior_0").transform.position = gameObject.transform.position;
	gameObject.Find("Warrior_0").transform.position.z = 0;
	target = gameObject.Find("Warrior_0").transform;
	
}
  
function Update () {

	if(target) {
	
		var point : Vector3 = camera.WorldToViewportPoint(target.position);
		var delta : Vector3 = target.position - camera.ViewportToWorldPoint(Vector3(0.5, 0.5, point.z));
		var destination : Vector3 = transform.position + delta;
		
		transform.position = Vector3.SmoothDamp(transform.position, destination, velocity, dampTime);
	
	}

}