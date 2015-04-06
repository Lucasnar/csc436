#pragma strict

public var speed : int = 1.0;
public var axisName : String = "Horizontal";
public var anim : Animator;
public var jumpButton : String = "space";
public var jumpPower: float = 100.0f;
private var canJump : boolean = true;
public var key1obtained : boolean = false;
var health : int = 3;

var interactButton : String = "z";
var attackButton : String = "x";
var hitBox : GameObject;
var attackBox : GameObject;
		
function Start() {

	// This is the function that starts when the game starts.
			
	anim = gameObject.GetComponent(Animator);
	hitBox.collider2D.enabled = false;
	attackBox.collider2D.enabled = false;
	
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
	
	if(Input.GetKeyDown(interactButton)){
	
		Hit();
		
	}
	
	if(Input.GetKeyDown(attackButton)){
	
		anim.SetFloat("Attack", 1);
		Attack();
		
	}
	
	
	if (health == 3){
	
		gameObject.Find("Heart1").GetComponent(UI.Image).color.a = 1;
		gameObject.Find("Heart2").GetComponent(UI.Image).color.a = 1;
		gameObject.Find("Heart3").GetComponent(UI.Image).color.a = 1;
	
	}
	
	if (health == 2){
	
		gameObject.Find("Heart1").GetComponent(UI.Image).color.a = 0;
		gameObject.Find("Heart2").GetComponent(UI.Image).color.a = 1;
		gameObject.Find("Heart3").GetComponent(UI.Image).color.a = 1;
	
	}
	
	if (health == 1){
		
		gameObject.Find("Heart1").GetComponent(UI.Image).color.a = 0;
		gameObject.Find("Heart2").GetComponent(UI.Image).color.a = 0;
		gameObject.Find("Heart3").GetComponent(UI.Image).color.a = 1;
	
	}
	
	if (health == 0){
	
		gameObject.Find("Heart1").GetComponent(UI.Image).color.a = 0;
		gameObject.Find("Heart2").GetComponent(UI.Image).color.a = 0;
		gameObject.Find("Heart3").GetComponent(UI.Image).color.a = 0;
		Die();
		
	}
	
	transform.position += transform.right * Input.GetAxis(axisName) * speed * Time.deltaTime;
}

function Hit(){
	
	hitBox.collider2D.enabled = true;
	yield WaitForSeconds(0.01);
	hitBox.collider2D.enabled = false;
	
}

function Attack(){

	yield WaitForSeconds(0.1);
	attackBox.collider2D.enabled = true;
	yield WaitForSeconds(0.1);
	attackBox.collider2D.enabled = false;
	anim.SetFloat("Attack", 0);

}

function Die(){
	// Very simple; only to handle some things until I make a proper Die() function.

	anim.SetFloat("Die", 1);
	canJump = false;
	speed = 0;
	health = 0;
	yield WaitForSeconds(2);
	// Destroy(GameObject.FindWithTag("Player")); // Not needed for now; but later will be, I guess.
	Application.LoadLevel("Scene_1");

}

function Hurt(){

	health -= 1;

}

function OnCollisionEnter2D(coll : Collision2D){
	
	if(coll.gameObject.tag == "Ground" || "Enemy" || "Enemytop" || "Thorn"){
		
		anim.SetFloat("Jump", 0);
		canJump = true;
		
	}
	
	if(coll.gameObject.tag == "Key1"){
		
		key1obtained = true;
		Destroy(coll.gameObject);
		
		
	}
	
	if(coll.gameObject.tag == "Enemy"){
		
		rigidbody2D.AddForce(Vector2.up * 40);
		Hurt();
		
	}
	
	if(coll.gameObject.tag == "Thorn" && health > 0){
		
		rigidbody2D.AddForce(Vector2.up * 40);
		Hurt();
		
	}
}

function OnTriggerEnter2D(coll : Collider2D){

		if(coll.gameObject.tag == "Enemytop"){
		
		anim.SetFloat("Jump", 0);
		rigidbody2D.AddForce(Vector2.up * 100);
		Destroy(coll.transform.root.gameObject);
		
	}

}