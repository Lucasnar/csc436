#pragma strict

public var speed : int = 1.0;
public var axisName : String = "Horizontal";
public var anim : Animator;
public var jumpButton : String = "space";
public var jumpPower: float = 100.0f;
private var canJump : boolean = true;

function Start() {

	// This is the function that starts when the game starts.
			
	anim = gameObject.GetComponent(Animator);

}

function Update() {
	
	// This function calls every frame.
	
	var newScale : Vector3; // Unity uses Vector3 to calculate 3D Position and 	Direction.
	
	anim.SetFloat("Walk", Mathf.Abs(Input.GetAxis(axisName))); // Set the walk variable to the axis.
	
	
	// It changes the walk animation to the correct side.
	
	if(Input.GetAxis(axisName) < 0) {
	
		newScale = transform.localScale;
		newScale.x = -1f;
		transform.localScale = newScale;
		
	}
	
	else if(Input.GetAxis(axisName) > 0) {
	
		newScale = transform.localScale;
		newScale.x = 1f;
		transform.localScale = newScale;
		
	}
	
	if(Input.GetKeyDown(jumpButton)){
		
		if(canJump == true){
		
			anim.SetFloat("Jump", 1);
			rigidbody2D.AddForce(transform.up * jumpPower);
			canJump = false;
			
		}
				
	}
	
	transform.position += transform.right * Input.GetAxis(axisName) * speed * Time.deltaTime;
	
}

function OnCollisionEnter2D(coll : Collision2D){
	
	if(coll.gameObject.tag == "Ground"){
	
		anim.SetFloat("Jump", 0);
		canJump = true;
	}
}
