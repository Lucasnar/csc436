#pragma strict

public var speed : int = 1.0;
public var axisName : String = "Horizontal";
public var anim : Animator;
public var jumpButton : String = "space";
public var jumpPower: float = 75.0f;
public var pauseButton : String = "escape";
private var canJump : boolean = true;
public var key1obtained : boolean = false;
var pressZToActiveEvent : boolean = false;
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
	DontDestroyOnLoad(gameObject);
	StopControl();
	gameObject.Find("BegginingText").GetComponent(UI.Text).color.a = 1;
	
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
			gameObject.Find("JumpSound").audio.Play();
			rigidbody2D.AddForce(transform.up * jumpPower);
			canJump = false;
			
		}
				
	}
	
	if(Input.GetKeyDown(interactButton)){
	
		if (gameObject.Find("BegginingText").GetComponent(UI.Text).color.a == 1){
			
			gameObject.Find("BegginingText").GetComponent(UI.Text).color.a = 0;
			gameObject.Find("ControlsText").GetComponent(UI.Text).color.a = 1;
			pressZToActiveEvent = false;
		
		}
		
		else if (pressZToActiveEvent == true && !key1obtained){
		
			gameObject.Find("GetTheKeyText").GetComponent(UI.Text).color.a = 1;
			pressZToActiveEvent = false;
			StopControl();
		
		}	
	
		else{
			gameObject.Find("ControlsText").GetComponent(UI.Text).color.a = 0;
			gameObject.Find("GetTheKeyText").GetComponent(UI.Text).color.a = 0;
			Time.timeScale = 1;
			StartControl();
			Hit();
		
		}
		
		
	}
	
	if(Input.GetKeyDown(attackButton)){
	
		anim.SetFloat("Attack", 1);
		gameObject.Find("AttackSound").audio.Play();
		Attack();
		
	}
	
	if(Input.GetKeyDown(pauseButton)){
	
		if(Time.timeScale != 0){
		
			Time.timeScale = 0;
			gameObject.Find("GamePaused").GetComponent(UI.Image).color.a = 1;
			EnableButtons();
		
		}
		else{
		
			Time.timeScale = 1;
			gameObject.Find("GamePaused").GetComponent(UI.Image).color.a = 0;
			DisableButtons();
					
		}	
	
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
		if (speed != 0){
			Die();
		}		
	}
	
	transform.position += transform.right * Input.GetAxis(axisName) * speed * Time.deltaTime;
}

function EnableButtons(){

	gameObject.Find("StartButton").GetComponent(UI.Button).interactable = true;
	gameObject.Find("QuitButton").GetComponent(UI.Button).interactable = true;
	
	gameObject.Find("StartButton").GetComponent(UI.Image).color.a = 1;
	gameObject.Find("TextStartButton").GetComponent(UI.Text).color.a = 1;
	gameObject.Find("QuitButton").GetComponent(UI.Image).color.a = 1;
	gameObject.Find("TextQuitButton").GetComponent(UI.Text).color.a = 1;

}

function DisableButtons(){

	gameObject.Find("StartButton").GetComponent(UI.Button).interactable = false;
	gameObject.Find("QuitButton").GetComponent(UI.Button).interactable = false;
	
	gameObject.Find("StartButton").GetComponent(UI.Image).color.a = 0;
	gameObject.Find("TextStartButton").GetComponent(UI.Text).color.a = 0;
	gameObject.Find("QuitButton").GetComponent(UI.Image).color.a = 0;
	gameObject.Find("TextQuitButton").GetComponent(UI.Text).color.a = 0;

}

function Hit(){
	
	hitBox.collider2D.enabled = true;
	yield WaitForSeconds(0.1);
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

	anim.SetFloat("Die", 1);
	speed = 0;
	jumpPower = 0;
	axisName = "None";
	gameObject.Find("GamePlayMusic").audio.Stop();
	gameObject.Find("DeathSound").audio.Play();
	gameObject.Find("FirstMusic_v2").audio.Play();
	yield WaitForSeconds(1);
	Time.timeScale = 0;
	Destroy(gameObject);
	gameObject.Find("GameOver").GetComponent(UI.Image).color.a = 1;
	EnableButtons();
	
}


function Hurt(){
	
	gameObject.Find("HurtSound").audio.Play();
	health -= 1;
	yield WaitForSeconds(0.1);
	gameObject.GetComponent(SpriteRenderer).color.a = 0.5;
	yield WaitForSeconds(0.1);
	gameObject.GetComponent(SpriteRenderer).color.a = 1;
	yield WaitForSeconds(0.1);
	gameObject.GetComponent(SpriteRenderer).color.a = 0.5;
	yield WaitForSeconds(0.1);
	gameObject.GetComponent(SpriteRenderer).color.a = 1;
	yield WaitForSeconds(0.1);
	gameObject.GetComponent(SpriteRenderer).color.a = 0.5;
	yield WaitForSeconds(0.1);
	gameObject.GetComponent(SpriteRenderer).color.a = 1;

}

function StopControl() {

	speed = 0;
	jumpPower = 0;
	axisName = "None";
	jumpButton = "equals";
	attackButton = "equals";	
	

}

function StartControl() {

	speed = 1;
	jumpPower = 75;
	axisName = "Horizontal";
	jumpButton = "space";
	attackButton = "x";	
	interactButton = "z";
	

}

function LastScene() {

	gameObject.Find("VillainText1").GetComponent(UI.Text).color.a = 1;
	gameObject.Find("Villain3").GetComponent(Animator).SetBool("Villain3Movement", true);
	yield WaitForSeconds(5);
	gameObject.Find("VillainText1").GetComponent(UI.Text).color.a = 0;
	yield WaitForSeconds(10);
	gameObject.Find("VillainText2").GetComponent(UI.Text).color.a = 1;
	yield WaitForSeconds(5);
	gameObject.Find("VillainText2").GetComponent(UI.Text).color.a = 0;
	yield WaitForSeconds(3);
	gameObject.Find("VillainText3").GetComponent(UI.Text).color.a = 1;
	yield WaitForSeconds(3);
	gameObject.Find("VillainText3").GetComponent(UI.Text).color.a = 0;
	StartControl();
}

function OnCollisionEnter2D(coll : Collision2D){
	
	
	if(coll.gameObject.tag == "Ground"){
		
		anim.SetFloat("Jump", 0);
		canJump = true;
	}
	
	if(coll.gameObject.tag == "Enemy"){

		anim.SetFloat("Jump", 0);
		canJump = true;
	}
	
	if(coll.gameObject.tag == "Enemytop"){
		
		anim.SetFloat("Jump", 0);
		canJump = true;
	}
	
	if(coll.gameObject.tag == "Key1"){
		
		key1obtained = true;
		Destroy(coll.gameObject);
		gameObject.Find("KeySound").audio.Play();
		gameObject.Find("Key_1Image").GetComponent(UI.Image).color.a = 1;
		
		
	}
	
	if(coll.gameObject.tag == "Heart1"){
		
			if (health < 3){
			
				health += 1;
				
			}
			gameObject.Find("HeartSound").audio.Play();
			Destroy(coll.gameObject);
		
	}
	
	if(coll.gameObject.tag == "Enemy" && health > 0){
		
		rigidbody2D.AddForce(Vector2.up * 20);
		Hurt();
		
	}
	
	if(coll.gameObject.tag == "Rock" && health > 0){

		Hurt();
		
	}
	
	if(coll.gameObject.tag == "Thorn" && health > 0){
		
		rigidbody2D.AddForce(Vector2.up * 40);
		Hurt();
		
	}

	if(coll.gameObject.tag == "Lava" && health > 0){
		
		rigidbody2D.AddForce(Vector2.up * 50);
		Hurt();
		
	}
	
	if(coll.gameObject.tag == "Projectile"){
	
		Hurt();
	
	}
	
}

function OnTriggerEnter2D(coll : Collider2D){

		if(coll.gameObject.tag == "Enemytop"){
		
			gameObject.Find("HurtSound").audio.Play();
			anim.SetFloat("Jump", 0);
			rigidbody2D.AddForce(Vector2.up * 80);
			Destroy(coll.transform.root.gameObject);
		}
		
		if(coll.gameObject.tag == "StopRocks"){
		
			gameObject.Find("Rock1").collider2D.enabled = false;
			gameObject.Find("Rock2").collider2D.enabled = false;
			gameObject.Find("Rock3").collider2D.enabled = false;
			
			gameObject.Find("Rock1").GetComponent(SpriteRenderer).color.a = 0; 
			gameObject.Find("Rock2").GetComponent(SpriteRenderer).color.a = 0;
			gameObject.Find("Rock3").GetComponent(SpriteRenderer).color.a = 0;
		}
		
		if(coll.gameObject.tag == "StartRocks"){
		
			gameObject.Find("Rock1").collider2D.enabled = true;
			gameObject.Find("Rock2").collider2D.enabled = true;
			gameObject.Find("Rock3").collider2D.enabled = true;
			
			gameObject.Find("Rock1").GetComponent(SpriteRenderer).color.a = 1; 
			gameObject.Find("Rock2").GetComponent(SpriteRenderer).color.a = 1;
			gameObject.Find("Rock3").GetComponent(SpriteRenderer).color.a = 1;
		}
		
		if(coll.gameObject.tag == "SceneEntering"){
			
			Time.timeScale = 0;
			StopControl();
			gameObject.Find("BegginingText").GetComponent(UI.Text).color.a = 1;
			Destroy(coll.gameObject);
		
		}
		
		if(coll.gameObject.tag == "GetTheKey"){
		
				pressZToActiveEvent = true;
		
		}
		
		if(coll.gameObject.tag == "Potion1"){
		
				Destroy(coll.gameObject);
				Hurt();
		
		}
		
		if(coll.gameObject.tag == "CameraPersTo16"){
			
			gameObject.Find("Main Camera").camera.fieldOfView = 16;
		
		}
		
		if(coll.gameObject.tag == "ActiveLastScene"){
			
			gameObject.Find("GamePlayMusic").audio.Stop();
			Destroy(coll.gameObject);
			Destroy(gameObject.Find("CameraPersTo16"));
			interactButton = "equals";
			StopControl();
			LastScene();
		
		}

}

function OnTriggerExit2D(coll : Collider2D){

	if(coll.gameObject.tag == "GetTheKey"){

			pressZToActiveEvent = false;
		
		}
	
	if(coll.gameObject.tag == "CameraPersTo16"){
		
			gameObject.Find("Main Camera").camera.fieldOfView = 11;
		
		}

}