class SlidePresentation {
	constructor() {
		this.currentSlide = 1;
		this.totalSlides = 8;
		this.slides = document.querySelectorAll(".slide");
		this.prevBtn = document.getElementById("prevBtn");
		this.nextBtn = document.getElementById("nextBtn");
		this.exportBtn = document.getElementById("exportBtn");
		this.progressBar = document.getElementById("progress");

		this.init();
	}

	init() {
		this.updateProgress();
		this.updateButtons();
		this.bindEvents();

		// キーボードナビゲーション
		document.addEventListener("keydown", (e) => {
			if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
				this.prevSlide();
			} else if (e.key === "ArrowRight" || e.key === "ArrowDown") {
				this.nextSlide();
			}
		});
	}

	bindEvents() {
		this.prevBtn.addEventListener("click", () => this.prevSlide());
		this.nextBtn.addEventListener("click", () => this.nextSlide());
		this.exportBtn.addEventListener("click", () => this.exportToPPTX());
	}

	showSlide(slideNumber) {
		// 現在のスライドを非表示
		for (const slide of this.slides) {
			slide.classList.remove("active");
		}

		// 指定されたスライドを表示
		const targetSlide = document.querySelector(`[data-slide="${slideNumber}"]`);
		if (targetSlide) {
			targetSlide.classList.add("active");
			this.currentSlide = slideNumber;
			this.updateProgress();
			this.updateButtons();
		}
	}

	nextSlide() {
		if (this.currentSlide < this.totalSlides) {
			this.showSlide(this.currentSlide + 1);
		}
	}

	prevSlide() {
		if (this.currentSlide > 1) {
			this.showSlide(this.currentSlide - 1);
		}
	}

	updateProgress() {
		const progress = (this.currentSlide / this.totalSlides) * 100;
		this.progressBar.style.width = `${progress}%`;
	}

	updateButtons() {
		this.prevBtn.disabled = this.currentSlide === 1;
		this.nextBtn.disabled = this.currentSlide === this.totalSlides;
	}

	async exportToPPTX() {
		try {
			this.exportBtn.innerHTML =
				'<i class="fas fa-spinner fa-spin"></i> 生成中...';
			this.exportBtn.disabled = true;

			// PptxGenJSを使用してプレゼンテーションを作成
			const pres = new PptxGenJS();

			// スライドマスターの設定
			pres.layout = "LAYOUT_16x9";

			// タイトルスライド
			const slide1 = pres.addSlide();
			slide1.background = { fill: { color: "F093FB" } };
			slide1.addText("LLM (Large Language Model)", {
				x: 0.5,
				y: 2,
				w: 11,
				h: 1.5,
				fontSize: 44,
				color: "FFFFFF",
				bold: true,
				align: "center",
			});
			slide1.addText("大規模言語モデルの基礎から応用まで", {
				x: 0.5,
				y: 4,
				w: 11,
				h: 1,
				fontSize: 32,
				color: "FFFFFF",
				align: "center",
			});

			// スライド2: LLMとは
			const slide2 = pres.addSlide();
			slide2.addText("LLMとは何か？", {
				x: 0.5,
				y: 0.5,
				w: 11,
				h: 1,
				fontSize: 36,
				color: "2C3E50",
				bold: true,
				align: "center",
			});

			const features = [
				"大量のテキストデータで訓練された深層学習モデル",
				"自然言語の理解と生成が可能",
				"トランスフォーマーアーキテクチャを基盤",
				"数十億〜数兆のパラメータを持つ",
			];

			features.forEach((feature, index) => {
				slide2.addText(`• ${feature}`, {
					x: 1,
					y: 2 + index * 0.8,
					w: 10,
					h: 0.6,
					fontSize: 20,
					color: "2C3E50",
				});
			});

			// スライド3: LLMの仕組み
			const slide3 = pres.addSlide();
			slide3.addText("LLMの仕組み", {
				x: 0.5,
				y: 0.5,
				w: 11,
				h: 1,
				fontSize: 36,
				color: "2C3E50",
				bold: true,
				align: "center",
			});

			// トランスフォーマー層
			slide3.addShape(pres.ShapeType.rect, {
				x: 2,
				y: 2,
				w: 8,
				h: 1.5,
				fill: { color: "FF9A9E" },
				line: { color: "FF6B9D", width: 2 },
			});
			slide3.addText("トランスフォーマー層\nアテンション機構", {
				x: 2,
				y: 2,
				w: 8,
				h: 1.5,
				fontSize: 18,
				color: "2C3E50",
				align: "center",
				valign: "middle",
			});

			// 埋め込み層
			slide3.addShape(pres.ShapeType.rect, {
				x: 2,
				y: 4,
				w: 8,
				h: 1.5,
				fill: { color: "A8EDEA" },
				line: { color: "00D2FF", width: 2 },
			});
			slide3.addText("埋め込み層\nトークン化・ベクトル化", {
				x: 2,
				y: 4,
				w: 8,
				h: 1.5,
				fontSize: 18,
				color: "2C3E50",
				align: "center",
				valign: "middle",
			});

			// スライド4: LLMの種類
			const slide4 = pres.addSlide();
			slide4.addText("LLMの種類", {
				x: 0.5,
				y: 0.5,
				w: 11,
				h: 1,
				fontSize: 36,
				color: "2C3E50",
				bold: true,
				align: "center",
			});

			const models = [
				{
					name: "GPTシリーズ",
					desc: "OpenAI開発\n対話・文章生成に特化",
					color: "00D4AA",
				},
				{ name: "BERT", desc: "Google開発\n文章理解に特化", color: "4285F4" },
				{ name: "T5", desc: "Google開発\nText-to-Text変換", color: "EA4335" },
				{ name: "Claude", desc: "Anthropic開発\n安全性重視", color: "FF6B35" },
			];

			models.forEach((model, index) => {
				const x = (index % 2) * 6 + 1;
				const y = Math.floor(index / 2) * 2.5 + 2;

				slide4.addShape(pres.ShapeType.rect, {
					x: x,
					y: y,
					w: 4.5,
					h: 2,
					fill: { color: "FFFFFF" },
					line: { color: model.color, width: 3 },
				});
				slide4.addText(model.name, {
					x: x,
					y: y + 0.2,
					w: 4.5,
					h: 0.6,
					fontSize: 20,
					color: model.color,
					bold: true,
					align: "center",
				});
				slide4.addText(model.desc, {
					x: x,
					y: y + 0.8,
					w: 4.5,
					h: 1,
					fontSize: 14,
					color: "2C3E50",
					align: "center",
				});
			});

			// スライド5: 学習プロセス
			const slide5 = pres.addSlide();
			slide5.addText("LLMの学習プロセス", {
				x: 0.5,
				y: 0.5,
				w: 11,
				h: 1,
				fontSize: 36,
				color: "2C3E50",
				bold: true,
				align: "center",
			});

			const phases = [
				{
					name: "事前学習",
					desc: "大量のテキストデータ\n（インターネット、書籍など）",
					color: "667EEA",
				},
				{
					name: "ファインチューニング",
					desc: "特定のタスクに\n特化した調整",
					color: "F093FB",
				},
				{
					name: "RLHF",
					desc: "人間のフィードバックによる\n強化学習",
					color: "4FACFE",
				},
			];

			phases.forEach((phase, index) => {
				const y = index * 2 + 2;

				slide5.addShape(pres.ShapeType.rect, {
					x: 3,
					y: y,
					w: 6,
					h: 1.5,
					fill: { color: phase.color },
					line: { color: phase.color, width: 2 },
				});
				slide5.addText(phase.name, {
					x: 3,
					y: y + 0.1,
					w: 6,
					h: 0.5,
					fontSize: 18,
					color: "FFFFFF",
					bold: true,
					align: "center",
				});
				slide5.addText(phase.desc, {
					x: 3,
					y: y + 0.6,
					w: 6,
					h: 0.8,
					fontSize: 14,
					color: "FFFFFF",
					align: "center",
				});

				if (index < phases.length - 1) {
					slide5.addText("↓", {
						x: 5.5,
						y: y + 1.6,
						w: 1,
						h: 0.3,
						fontSize: 24,
						color: "666666",
						align: "center",
					});
				}
			});

			// スライド6: 応用例
			const slide6 = pres.addSlide();
			slide6.addText("LLMの応用例", {
				x: 0.5,
				y: 0.5,
				w: 11,
				h: 1,
				fontSize: 36,
				color: "2C3E50",
				bold: true,
				align: "center",
			});

			const applications = [
				{ name: "文章生成", desc: "記事、小説、レポート作成" },
				{ name: "翻訳", desc: "多言語間の自動翻訳" },
				{ name: "プログラミング", desc: "コード生成・デバッグ支援" },
				{ name: "質問応答", desc: "チャットボット・FAQ" },
				{ name: "要約", desc: "長文の要約・抽出" },
				{ name: "感情分析", desc: "テキストの感情判定" },
			];

			applications.forEach((app, index) => {
				const x = (index % 3) * 4 + 0.5;
				const y = Math.floor(index / 3) * 2 + 2;

				slide6.addShape(pres.ShapeType.rect, {
					x: x,
					y: y,
					w: 3.5,
					h: 1.5,
					fill: { color: "F8F9FA" },
					line: { color: "E9ECEF", width: 2 },
				});
				slide6.addText(app.name, {
					x: x,
					y: y + 0.2,
					w: 3.5,
					h: 0.5,
					fontSize: 16,
					color: "2C3E50",
					bold: true,
					align: "center",
				});
				slide6.addText(app.desc, {
					x: x,
					y: y + 0.7,
					w: 3.5,
					h: 0.6,
					fontSize: 12,
					color: "666666",
					align: "center",
				});
			});

			// スライド7: 課題と限界
			const slide7 = pres.addSlide();
			slide7.addText("課題と限界", {
				x: 0.5,
				y: 0.5,
				w: 11,
				h: 1,
				fontSize: 36,
				color: "2C3E50",
				bold: true,
				align: "center",
			});

			const challenges = [
				{ name: "ハルシネーション", desc: "事実と異なる情報の生成" },
				{ name: "バイアス", desc: "学習データに含まれる偏見" },
				{ name: "計算コスト", desc: "大量の計算資源が必要" },
				{ name: "知識の鮮度", desc: "学習時点以降の情報不足" },
			];

			challenges.forEach((challenge, index) => {
				const x = (index % 2) * 6 + 1;
				const y = Math.floor(index / 2) * 1.5 + 2;

				slide7.addShape(pres.ShapeType.rect, {
					x: x,
					y: y,
					w: 4.5,
					h: 1.2,
					fill: { color: "FFF5F5" },
					line: { color: "FEB2B2", width: 2 },
				});
				slide7.addText(challenge.name, {
					x: x,
					y: y + 0.1,
					w: 4.5,
					h: 0.4,
					fontSize: 16,
					color: "E53E3E",
					bold: true,
					align: "center",
				});
				slide7.addText(challenge.desc, {
					x: x,
					y: y + 0.5,
					w: 4.5,
					h: 0.6,
					fontSize: 12,
					color: "2C3E50",
					align: "center",
				});
			});

			// 解決への取り組み
			slide7.addShape(pres.ShapeType.rect, {
				x: 1,
				y: 5.5,
				w: 10,
				h: 1.5,
				fill: { color: "F0FFF4" },
				line: { color: "9AE6B4", width: 2 },
			});
			slide7.addText("解決への取り組み", {
				x: 1,
				y: 5.6,
				w: 10,
				h: 0.4,
				fontSize: 16,
				color: "2F855A",
				bold: true,
				align: "center",
			});
			slide7.addText(
				"• RAG（Retrieval-Augmented Generation）\n• ファクトチェック機構の導入\n• 効率的なモデルアーキテクチャの開発",
				{
					x: 1.5,
					y: 6,
					w: 9,
					h: 0.9,
					fontSize: 12,
					color: "2D3748",
				},
			);

			// スライド8: 未来と展望
			const slide8 = pres.addSlide();
			slide8.addText("LLMの未来と展望", {
				x: 0.5,
				y: 0.5,
				w: 11,
				h: 1,
				fontSize: 36,
				color: "2C3E50",
				bold: true,
				align: "center",
			});

			const timeline = [
				{ period: "現在", milestone: "対話型AI・コード生成" },
				{
					period: "近未来",
					milestone: "マルチモーダルAI\n（テキスト+画像+音声）",
				},
				{ period: "将来", milestone: "AGI（汎用人工知能）\nへの発展" },
			];

			timeline.forEach((item, index) => {
				const x = index * 4 + 1;

				// 年代の円
				slide8.addShape(pres.ShapeType.ellipse, {
					x: x + 1.25,
					y: 2,
					w: 1.5,
					h: 1.5,
					fill: { color: "3498DB" },
					line: { color: "3498DB", width: 2 },
				});
				slide8.addText(item.period, {
					x: x + 1.25,
					y: 2,
					w: 1.5,
					h: 1.5,
					fontSize: 14,
					color: "FFFFFF",
					bold: true,
					align: "center",
					valign: "middle",
				});

				// マイルストーン
				slide8.addShape(pres.ShapeType.rect, {
					x: x,
					y: 4,
					w: 4,
					h: 1.5,
					fill: { color: "F8F9FA" },
					line: { color: "E9ECEF", width: 2 },
				});
				slide8.addText(item.milestone, {
					x: x,
					y: 4,
					w: 4,
					h: 1.5,
					fontSize: 12,
					color: "2C3E50",
					align: "center",
					valign: "middle",
				});
			});

			// まとめ
			slide8.addShape(pres.ShapeType.rect, {
				x: 1,
				y: 6.5,
				w: 10,
				h: 1.5,
				fill: { color: "667EEA" },
				line: { color: "667EEA", width: 2 },
			});
			slide8.addText("まとめ", {
				x: 1,
				y: 6.6,
				w: 10,
				h: 0.4,
				fontSize: 16,
				color: "FFFFFF",
				bold: true,
				align: "center",
			});
			slide8.addText(
				"LLMは言語処理の革命をもたらし、\nさまざまな分野での活用が期待される技術です",
				{
					x: 1,
					y: 7,
					w: 10,
					h: 0.9,
					fontSize: 14,
					color: "FFFFFF",
					align: "center",
					valign: "middle",
				},
			);

			// ファイルを保存
			await pres.writeFile({ fileName: "LLM解説スライド.pptx" });

			this.exportBtn.innerHTML = '<i class="fas fa-check"></i> 完了!';
			setTimeout(() => {
				this.exportBtn.innerHTML = '<i class="fas fa-download"></i> PPTX出力';
				this.exportBtn.disabled = false;
			}, 2000);
		} catch (error) {
			console.error("PPTX出力エラー:", error);
			this.exportBtn.innerHTML =
				'<i class="fas fa-exclamation-triangle"></i> エラー';
			setTimeout(() => {
				this.exportBtn.innerHTML = '<i class="fas fa-download"></i> PPTX出力';
				this.exportBtn.disabled = false;
			}, 2000);
		}
	}
}

// ページ読み込み後に初期化
document.addEventListener("DOMContentLoaded", () => {
	new SlidePresentation();
});

// スワイプジェスチャー対応（タッチデバイス用）
let startX = 0;
let startY = 0;

document.addEventListener("touchstart", (e) => {
	startX = e.touches[0].clientX;
	startY = e.touches[0].clientY;
});

document.addEventListener("touchend", (e) => {
	if (!startX || !startY) return;

	const endX = e.changedTouches[0].clientX;
	const endY = e.changedTouches[0].clientY;

	const diffX = startX - endX;
	const diffY = startY - endY;

	// 水平方向のスワイプが垂直方向より大きい場合のみ処理
	if (Math.abs(diffX) > Math.abs(diffY)) {
		if (Math.abs(diffX) > 50) {
			// 最小スワイプ距離
			if (diffX > 0) {
				// 左スワイプ（次のスライド）
				const presentation = window.slidePresentation;
				if (presentation) presentation.nextSlide();
			} else {
				// 右スワイプ（前のスライド）
				const presentation = window.slidePresentation;
				if (presentation) presentation.prevSlide();
			}
		}
	}

	startX = 0;
	startY = 0;
});
