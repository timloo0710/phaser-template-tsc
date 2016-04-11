export class Loading extends Phaser.State {
    ready: boolean = false;

    loadingText: Phaser.Text;
    loadingBarBg: Phaser.Sprite;
    loadingBar: Phaser.Sprite;

    create() {
        let fontStyle = {
            font: '18px Walter Turncoat',
            fill: '#7edcfc'
        };

        this.loadingBarBg = this.game.add.sprite(this.game.world.centerX,
                                                 this.game.world.centerY,
                                                 'loadingBarBg');
        this.loadingBarBg.tint = 0x7edcfc; // Same blue as text
        this.loadingBarBg.anchor.setTo(0.5);

        this.loadingBar = this.game.add.sprite(this.game.world.centerX - 175,
                                               this.game.world.centerY - 16,
                                               'loadingBar');
        this.loadingBar.tint = 0xdcfc7e; // A contrasting green

        this.load.setPreloadSprite(this.loadingBar);

        this.loadingText = this.add.text(this.world.centerX,
                                         this.world.centerY - 30,
                                         'Loading...', fontStyle);
        this.loadingText.anchor.setTo(0.5);

        this.game.load.onFileComplete.add(this.fileComplete, this);

        // Load game assets here
        this.game.load.image('example', 'assets/images/loading-bar.png');

        this.game.load.start(); // Required so the onFileComplete listener is called
    }

    update() {
        if (this.ready) {
            this.game.state.start('Menu');
        }
    }

    fileComplete(progress, cacheKey, success, totalLoaded, totalFiles) {
        this.loadingText.setText('Loading... ' + progress + '%');

        if (progress === 100) {
            this.ready = true;
        }
    }
}
