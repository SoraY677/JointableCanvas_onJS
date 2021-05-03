// 全て読み込まれた後で読み込む
window.onload = function () {
	canvas = document.getElementById('main_canvas');
	// canvasタグに描画するのに必要
	ctx = canvas.getContext('2d');
	// canvasとgetContext()メソッドが使えるかどうか判定（エラー回避用）
	if (!canvas || !ctx) {
		return;
	}
	// 背景塗る
	ctx.fillStyle = '#ccc';
	ctx.fillRect(0, 0, canvas.width, canvas.height);

	//　円を描く（頭の部分）
	ctx.beginPath();
	ctx.strokeStyle = '#000'; //　線の色調整
	ctx.lineWidth = 3; //　線の太さ調整
	ctx.arc(100, 50, 40, 0, Math.PI * 2, false);
	ctx.stroke();

	//　線を書く（手の部分）
	ctx.beginPath();
	ctx.strokeStyle = '#000';
	ctx.moveTo(50, 130);
	ctx.lineTo(100, 90);
	ctx.lineTo(150, 130);
	ctx.stroke();

	//　線を書く（縦棒）
	ctx.beginPath();
	ctx.moveTo(100, 90);
	ctx.lineTo(100, 150);
	ctx.stroke();

	//　線を書く（足の部分）
	ctx.beginPath();
	ctx.moveTo(50, 190);
	ctx.lineTo(100, 150);
	ctx.lineTo(150, 190);
	ctx.stroke();
}