		var colorArray = ["rgb(194, 190, 194)", "rgb(255, 255, 255)", "rgb(215, 210, 207)", "rgb (214, 200, 180)", "rgb(250, 181, 108)", "rgb(255, 126, 5)", "rgb(255, 84, 10)", "rgb(255, 18, 5)", "rgb(247, 233, 129)", "rgb(245, 202, 110)", "rgb(247, 213, 22)", "rgb(255, 174, 0)", "rgb(255, 102, 0)"]
		var board = [[0,0,0,0],
					 [0,0,0,0],
					 [0,0,0,0],
					 [0,0,0,0]];
		var isGG = false; 

		var canvas = document.getElementById('g');
		var ctx = canvas.getContext('2d');
		ctx.fillStyle = colorArray[6];
		ctx.fillRect(0,0,400,400);
//		canvas.width = "800";
		drawBoard(canvas)
		
		function drawBoard() {
			var i = 0, j = 0;
			for (i = 0; i < 4; i++){
				for (j = 0; j < 4; j++){
					switch(board[i][j]){
						case 0:
							ctx.fillStyle = colorArray[1]
							break;
						case 2:
							ctx.fillStyle = colorArray[2]
							break;
						case 4:
							ctx.fillStyle = colorArray[0]
							break;
						case 8:
							ctx.fillStyle = colorArray[4]
							break;
						case 16:
							ctx.fillStyle = colorArray[5]
							break;
						case 32:
							ctx.fillStyle = colorArray[6]
							break;
						case 64:
							ctx.fillStyle = colorArray[7]
							break;
						case 128:
							ctx.fillStyle = colorArray[8]
							break;
						case 256:
							ctx.fillStyle = colorArray[9]
							break;
						case 512:
							ctx.fillStyle = colorArray[10]
							break;
						case 1024:
							ctx.fillStyle = colorArray[11]
							break;
						case 2048:
							ctx.fillStyle = colorArray[12]
							break;
					}
					ctx.fillRect(j*100, i*100, 100, 100);	
					ctx.fillStyle = colorArray[1];
					ctx.textAlign = "center";
					ctx.font = "30px Monospace";
					ctx.fillText(board[i][j], j*100 + 50, i*100 + 60);					
				}

			}
		}


		var numGen = [2, 2, 2, 2, 4];
		function RNG(){

			var lvc = true
			while (lvc){
				var i = Math.floor(4*Math.random()), j = Math.floor(4*Math.random());
				if(board[i][j] === 0){
					board[i][j]=numGen[Math.floor(5*Math.random())];
					lvc = false;
					if (board[i][j] === 2)
						ctx.fillStyle = colorArray[2];
					else
						ctx.fillStyle = colorArray[0];
					ctx.fillRect(j*100, i*100, 100, 100);	

					// ctx.fillStyle = "rgb(250, 220, 220)";
					ctx.fillStyle = "black";
					ctx.textAlign = "center";
					ctx.font = "30px Monospace";
					ctx.fillText(board[i][j], j*100 + 50, i*100 + 60);	
				}

			}
		}



		document.body.addEventListener("keypress", gameMove,false);

		function show() {
			for(var i = 0; i < 4; i++){
				console.log((board[i].toString()));
			}
		}

		function gameMove(event) {
			if (isGG){
				RNG();
				drawBoard();
				isGG = false;
				document.getElementById("instruct").innerHTML = "Controls: WASD"

			}else{
				kp = event.keyCode
				prevBoard = copy_2d(board);
				switch(kp){
					case 97:
						swipeLeft();
						break;
					case 119:
						swipeUp();
						break;
					case 100:
						swipeRight();
						show();
						break;
					case 115:
						swipeDown();
						break;
				}
				if (!equal_2d(prevBoard, board)){
					show();
					drawBoard();
					RNG();
				}else{
					existZero = false;
					for(var i = 0; i < board.length; i++){
						if (existZero){ break;}
						for (var j = 0; j < board[i].length; j++){
							if (board[i][j] === 0){
								existZero = true;
								break;
							}
						}
					}
					if (!existZero){
						tempBoard = copy_2d(board)
						swipeLeft();
						swipeDown();
						swipeRight();
						swipeUp();
						if(equal_2d(tempBoard,board)){
							isGG = true;
							alert("GameOver");
							document.getElementById("instruct").innerHTML = "Press any key to start over!"
							board = [[0,0,0,0],
									 [0,0,0,0],
									 [0,0,0,0],
									 [0,0,0,0]];
						}else{
							board = tempBoard;
						}
					}
				}
			}	
		}
		function swipeDown() {
			pushDown();
			for (var i = 0; i < board[0].length; i++){	
				for (var j = board.length-1; j >=1 ; j--){
					if (board[j][i] !== 0 && board[j][i] === board[j-1][i]){
 					 	board[j][i] *=2;
						board[j - 1][i] = 0;
					}
				}
			}
		 
			pushDown();
		}

		function swipeUp() {
			pushUp();
			for (var i = 0; i < board[0].length; i++){	
				for (var j = 0; j < board.length-1; j++){
					if (board[j][i] !== 0 && board[j][i] === board[j+1][i]){
						board[j][i] *=2;
						board[j + 1][i] = 0;
					}
				}
			}
			pushUp();
		}

		function swipeLeft(){
			pushLeft();
			for (var i = 0; i < board.length; i++){	
				for (var j = 0; j < board[i].length-1; j++){
					if (board[i][j] !== 0 && board[i][j] === board[i][j+1]){
						board[i][j] *=2;
						board[i][j + 1] = 0;
					}
				}
			}
			pushLeft();		
		}

		function swipeRight() {
			pushRight();
			mergeRight();
			pushRight();
		}
		function mergeRight(){
			for (var i = 0; i < board.length; i++){	
				for (var j = board[i].length-1; j >= 1; j--){
					if (board[i][j] !== 0 && board[i][j] === board[i][j-1]){
						board[i][j] *=2;
						board[i][j - 1] = 0;
					}
				}
			}
		}
		function pushRight() {
			for (var i = 0; i < board.length; i++){
				var temp =[0, 1, 2, 3];
				for (var j = 0; j < board[i].length; j++){
					if (board[i][j] === 0){
						temp.splice(temp.indexOf(j),1);
					}
				
				}
				
				for (var j = 0; j < temp.length; j++){
					board[i][3-j] = board[i][temp[temp.length - 1 - j]]; 
					if (3-j !== temp[temp.length - 1 - j]){
						board[i][temp[temp.length - 1 - j]] = 0; 
					}
				}
			}
		}

		function pushLeft() {
			for (var i = 0; i < board.length; i++){
				var temp =[0, 1, 2, 3];
				for (var j = 0; j < board[i].length; j++){
					if (board[i][j] === 0){
						temp.splice(temp.indexOf(j),1);
					}
				
				}
				
				for (var j = 0; j < temp.length; j++){
					board[i][j] = board[i][temp[j]]; 
					if (j !== temp[j]){
						board[i][temp[j]] = 0; 
					}
				}
			}
		}

		function pushUp() {
			for (var i = 0; i < board[0].length; i++){
				var temp =[0, 1, 2, 3];
				for (var j = 0; j < board.length; j++){
					if (board[j][i] === 0){
						temp.splice(temp.indexOf(j),1);
					}
				
				}
				
				for (var j = 0; j < temp.length; j++){
					board[j][i] = board[temp[j]][i]; 
					if (j !== temp[j]){
						board[temp[j]][i] = 0;
					}
				}
			}
		}

		function pushDown() {
			for (var i = 0; i < board[0].length; i++){
				var temp =[0, 1, 2, 3];
				for (var j = 0; j < board.length; j++){
					if (board[j][i] === 0){
						temp.splice(temp.indexOf(j),1);
					}
				 
				}
				 
				for (var j = 0; j < temp.length; j++){
					board[3-j][i] = board[temp[temp.length-1-j]][i]; 
					if (3-j !== temp[temp.length-1-j]){
						board[temp[temp.length-1-j]][i] = 0;
					}
				}
			}
		}

		function copy_2d(array){
			var r = []
			for (var i = 0; i < array.length; i++){
				r[i] = array[i].slice();
			}
			return r;

		}
		function equal_2d(a1, a2){
			if (a1.length != a2.length){
				return false;
			}
			for(var i = 0; i < a1.length; i++){
				if (a1[i].length != a2 [i].length){
					return false;
				}
				for (var j = 0; j < a1[i].length; j++){
					if (a1[i][j] != a2[i][j]){
						return false;
					}
				}
			}
			return true;
		}
		RNG();
		drawBoard();
		console.log(board.toString());
