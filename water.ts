//% icon="\uf043" color="#1E90FF" weight=100
//% groups=["Water Animation", "Splash Effects", "Settings"]
namespace TileAnimation {

    // -------------------------------
    // Enums for Water Speed
    // -------------------------------
    export enum WaterSpeed {
        //% block="slow"
        Slow = 300,
        //% block="medium"
        Medium = 200,
        //% block="fast"
        Fast = 100
    }

    // -------------------------------
    // State variables
    // -------------------------------
    let animationEnabled = true
    let animationRunning = false
    let animationReversed = false
    let waterDebugEnabled = false
    let playerProximityRadius = 0
    let playerForProximity: Sprite = null
    let autoSplashPlayer: Sprite = null
    let waterFrames: Image[] = []

    export type WaterTile = {
        loc: tiles.Location,
        speed: number,
        lastUpdate: number,
        frame: number
    }

    let waterTiles: WaterTile[] = []

    // -------------------------------
    // Set Water Animation Speed
    // -------------------------------
    /**
     * Set the speed of all water tile animations.
     * @param speed Water animation speed
     */
    //% blockId=setWaterAnimationSpeed
    //% block="set water animation speed to %speed"
    //% speed.defl=WaterSpeed.Medium
    //% group="Water Animation"
    export function setWaterAnimationSpeed(speed: WaterSpeed) {
        waterTiles.forEach(wt => wt.speed = speed)
    }

    // -------------------------------
    // Initialize Water Animation
    // -------------------------------
    /**
     * Initialize water animation on a specific tile using 3 frame images.
     * @param baseTile Tile image to animate
     * @param frame1 First frame of animation
     * @param frame2 Second frame of animation
     * @param frame3 Third frame of animation
     */
    //% blockId=initWaterAnimation
    //% block="animate tile %baseTile with frames %frame1, %frame2, %frame3"
    //% group="Water Animation"
    export function initWaterAnimation(baseTile: Image, frame1: Image, frame2: Image, frame3: Image) {
        waterTiles = []
        waterFrames = [frame1, frame2, frame3]

        tiles.getTilesByType(baseTile).forEach(t => {
            waterTiles.push({
                loc: t,
                speed: Math.randomRange(100, 300),
                lastUpdate: control.millis() + Math.randomRange(0, 200),
                frame: Math.randomRange(0, 2)
            })
        })

        animationRunning = true

        game.onUpdate(function () {
            if (!animationEnabled) return;

            let now = control.millis();

            for (let wt of waterTiles) {
                if (now - wt.lastUpdate >= wt.speed) {
                    wt.frame = animationReversed ? (wt.frame - 1 + 3) % 3 : (wt.frame + 1) % 3;
                    wt.lastUpdate = now;

                    // Set the tile to the current animation frame
                    tiles.setTileAt(wt.loc, waterFrames[wt.frame]);

                    // If debugging is enabled, display debug info on the tile
                    if (waterDebugEnabled) {
                        let debugTile = image.create(16, 16);
                        debugTile.fill(7);  // Use a different color for debugging (7 = light yellow)
                        tiles.setTileAt(wt.loc, debugTile);
                    }
                }
            }
        });
    }

    // -------------------------------
    // Run Water Animation
    // -------------------------------
    /**
     * Start or stop the water animation.
     * @param on true to run, false to stop
     */
    //% blockId=runWaterAnimation
    //% block="run water animation %on"
    //% on.shadow=toggleYesNo
    //% group="Water Animation"
    export function runWaterAnimation(on: boolean) {
        animationEnabled = on
        if (!on) animationRunning = false
        else if (waterTiles.length > 0) animationRunning = true
    }

    // -------------------------------
    // Check Water Animation Status
    // -------------------------------
    /**
     * Returns true if water animation is currently running.
     */
    //% blockId=isWaterAnimationRunning
    //% block="water animation running?"
    //% group="Water Animation"
    export function isWaterAnimationRunning(): boolean {
        return animationRunning && animationEnabled
    }

    /**
     * Returns true if water animations are enabled.
     */
    //% blockId=isWaterAnimationEnabled
    //% block="water animation enabled?"
    //% group="Water Animation"
    export function isWaterAnimationEnabled(): boolean {
        return animationEnabled;
    }

    /**
     * Returns true if the water animation is active near the player.
     */
    //% blockId=isAnimateNearPlayerActive
    //% block="is water animation near player active?"
    //% group="Water Animation"
    export function isAnimateNearPlayerActive(): boolean {
        return playerProximityRadius > 0 && playerForProximity != null;
    }

    /**
     * Returns true if there are any active water tiles.
     */
    //% blockId=hasWaterTiles
    //% block="are there water tiles?"
    //% group="Water Animation"
    export function hasWaterTiles(): boolean {
        return waterTiles.length > 0;
    }

    /**
     * Stops and clears all water animations.
     */
    //% blockId=clearWaterAnimation
    //% block="clear water animation"
    //% group="Water Animation"
    export function clearWaterAnimation() {
        waterTiles = []
        animationRunning = false
    }

    /**
     * Enable or disable all water animations.
     * @param on true to enable, false to disable
     */
    //% blockId=setWaterEnabled
    //% block="set water animation enabled %on"
    //% on.shadow=toggleYesNo
    //% group="Water Animation"
    export function setWaterEnabled(on: boolean) {
        animationEnabled = on
        if (!on) animationRunning = false
    }

    // -------------------------------
    // Splash Functions
    // -------------------------------
    /**
     * Trigger water splash effects when the player moves over water tiles.
     * @param player The player sprite to trigger the effect.
     */
    //% blockId=waterCollisionEffect
    //% block="trigger water collision effect at player %player"
    //% group="Splash Effects"
    export function waterCollisionEffect(player: Sprite) {
        let playerTile = tiles.getTileLocation(Math.floor(player.x / 16), Math.floor(player.y / 16))

        let nearbyTiles = [
            tiles.getTileLocation(playerTile.col - 1, playerTile.row),
            tiles.getTileLocation(playerTile.col + 1, playerTile.row),
            tiles.getTileLocation(playerTile.col, playerTile.row - 1),
            tiles.getTileLocation(playerTile.col, playerTile.row + 1)
        ]

        nearbyTiles.forEach(tile => {
            let tileImage = tiles.getTileAt(tile.col, tile.row)

            if (waterFrames.some(frame => frame.equals(tileImage))) {
                tiles.setTileAt(tile, waterFrames[1]) // Change to the second frame (splash effect)
            }
        })

        playSplashSound("medium")
    }

    // -------------------------------
    // Sound Effects
    // -------------------------------
    /**
     * Play a splash sound based on the splash size.
     * @param splashSize Size of the splash (small, medium, or large)
     */
    //% blockId=playSplashSound
    //% block="play splash sound of size %splashSize"
    //% splashSize.defl="medium"
    //% group="Splash Effects"
    export function playSplashSound(splashSize: string) {
        if (splashSize == "small") {
            music.playSoundEffect(music.createSoundEffect(WaveShape.Sine, 200, 200, 255, 500, 100, SoundExpressionEffect.None, InterpolationCurve.Linear), SoundExpressionPlayMode.UntilDone)
        } else if (splashSize == "medium") {
            music.playSoundEffect(music.createSoundEffect(WaveShape.Sine, 300, 300, 255, 700, 100, SoundExpressionEffect.None, InterpolationCurve.Linear), SoundExpressionPlayMode.UntilDone)
        } else {
            music.playSoundEffect(music.createSoundEffect(WaveShape.Sine, 400, 400, 255, 1000, 100, SoundExpressionEffect.None, InterpolationCurve.Linear), SoundExpressionPlayMode.UntilDone)
        }
    }

    // -------------------------------
    // Settings
    // -------------------------------
    /**
     * Play the water animation frames in reverse order.
     * @param on true to reverse
     */
    //% blockId=reverseWaterAnimation
    //% block="reverse water animation %on"
    //% on.shadow=toggleYesNo
    //% group="Settings"
    export function reverseWaterAnimation(on: boolean) {
        animationReversed = on
    }

    /**
     * Overlay debug colors on water tiles.
     * @param on true to show debug
     */
    //% blockId=toggleWaterDebug
    //% block="show water debug tiles %on"
    //% on.shadow=toggleYesNo
    //% group="Settings"
    export function toggleWaterDebug(on: boolean) {
        waterDebugEnabled = on;

        if (waterDebugEnabled) {
            for (let wt of waterTiles) {
                let debugTile = image.create(16, 16);
                debugTile.fill(5);  // Fill with a bright color (5 = light green)
                tiles.setTileAt(wt.loc, debugTile);
            }
        } else {
            for (let wt of waterTiles) {
                tiles.setTileAt(wt.loc, waterFrames[wt.frame]);  // Reset to the current animation frame
            }
        }
    }

    /**
     * Only animate water tiles near a specific player sprite.
     * @param player The player sprite to follow
     * @param radius Radius around the player
     */
    //% blockId=animateNearPlayer
    //% block="animate water near player %player with radius %radius"
    //% player.shadow=variables_get
    //% radius.defl=3
    //% group="Settings"
    export function animateNearPlayer(player: Sprite = sprites.allOfKind(SpriteKind.Player)[0], radius: number = 3) {
        playerProximityRadius = radius
        playerForProximity = player

        const tileSize = 16;

        let mapWidth = Math.floor(scene.screenWidth() / tileSize);
        let mapHeight = Math.floor(scene.screenHeight() / tileSize);

        game.onUpdate(function () {
            let playerTile = tiles.getTileLocation(Math.floor(player.x / tileSize), Math.floor(player.y / tileSize));

            for (let rowOffset = -radius; rowOffset <= radius; rowOffset++) {
                for (let colOffset = -radius; colOffset <= radius; colOffset++) {
                    let neighborTile = tiles.getTileLocation(playerTile.col + colOffset, playerTile.row + rowOffset);

                    if (neighborTile.col >= 0 && neighborTile.col < mapWidth && neighborTile.row >= 0 && neighborTile.row < mapHeight) {
                        let tileImage = tiles.getTileAt(neighborTile.col, neighborTile.row);

                        if (isWaterFrame(tileImage)) {
                            let currentFrameIndex = getFrameIndex(tileImage);
                            let nextFrameIndex = (currentFrameIndex + 1) % waterFrames.length;

                            tiles.setTileAt(neighborTile, waterFrames[nextFrameIndex]);
                        }
                    }
                }
            }
        });
    }

    // -------------------------------
    // Helper Functions
    // -------------------------------
    function areImagesEqual(img1: Image, img2: Image): boolean {
        if (img1.width !== img2.width || img1.height !== img2.height) return false;

        for (let x = 0; x < img1.width; x++) {
            for (let y = 0; y < img1.height; y++) {
                if (img1.getPixel(x, y) !== img2.getPixel(x, y)) {
                    return false;
                }
            }
        }

        return true;
    }

    function isWaterFrame(tile: Image): boolean {
        return waterFrames.some((frame: Image) => areImagesEqual(frame, tile));
    }

    function getFrameIndex(tile: Image): number {
        for (let i = 0; i < waterFrames.length; i++) {
            if (areImagesEqual(waterFrames[i], tile)) {
                return i;
            }
        }
        return -1; // If no match found
    }

}
