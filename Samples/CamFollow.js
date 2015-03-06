#pragma strict

var dampTime : float = 0.5;

private var velocity = Vector3.zero;

var target : Transform;
  
function Update () {

	if(target) {
	
		var point : Vector3 = camera.WorldToViewportPoint(target.position);
		var delta : Vector3 = target.position - camera.ViewportToWorldPoint(Vector3(0.5, 0.5, point.z));
		var destination : Vector3 = transform.position + delta;
		
		transform.position = Vector3.SmoothDamp(transform.position, destination, velocity, dampTime);
	
	}

}