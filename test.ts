// tests go here; this will not be compiled when this package is used as an extension.
function Chapter1() {
    game.showLongText("Chapter 1: Basics", DialogLayout.Full)
    story.printCharacterText("It's very simple to make water")
    story.printCharacterText("To make some water you must first create a tilemap")
    tiles.setCurrentTilemap(tilemap`level1`)
    story.printCharacterText("Beautiful isn't it?")
    story.printCharacterText("Next you must create some custom tiles (In this case some water)")
    story.printCharacterText("You must make at least 2 custom tiles and put the tile you want to animate on the map")
    story.printCharacterText("You can also animate pre-built tiles or images!")
    story.printCharacterText("I'm going to put custom tile 1 as my animation tile")
    tiles.setCurrentTilemap(tilemap`level2`)
    timer.after(1000, function () {
        story.printCharacterText("Now to animate your tiles/images, use the animate tile with frames block")
        story.printCharacterText("Select what tile/image you want to animate in the first box")
        story.printCharacterText("Then select 3 frames to animate it")
        story.printCharacterText("That's all you have to do!")
        TileAnimation.initWaterAnimation(
            myTiles.tile1,
            myTiles.tile1,
            myTiles.tile2,
            myTiles.tile3
        )
        mySprite = sprites.create(img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . b 5 5 b . . . 
            . . . . . . b b b b b b . . . . 
            . . . . . b b 5 5 5 5 5 b . . . 
            . b b b b b 5 5 5 5 5 5 5 b . . 
            . b d 5 b 5 5 5 5 5 5 5 5 b . . 
            . . b 5 5 b 5 d 1 f 5 d 4 f . . 
            . . b d 5 5 b 1 f f 5 4 4 c . . 
            b b d b 5 5 5 d f b 4 4 4 4 b . 
            b d d c d 5 5 b 5 4 4 4 4 4 4 b 
            c d d d c c b 5 5 5 5 5 5 5 b . 
            c b d d d d d 5 5 5 5 5 5 5 b . 
            . c d d d d d d 5 5 5 5 5 d b . 
            . . c b d d d d d 5 5 5 b b . . 
            . . . c c c c c c c c b b . . . 
            `, SpriteKind.Player)
        tiles.placeOnTile(mySprite, tiles.getTileLocation(7, 7))
        scene.cameraFollowSprite(mySprite)
        mySprite.vx = 80
        timer.after(1300, function () {
            mySprite.vx = -80
            mySprite.setImage(img`
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . b 5 5 b . . . . . . . . . 
                . . . . b b b b b b . . . . . . 
                . . . b 5 5 5 5 5 b b . . . . . 
                . . b 5 5 5 5 5 5 5 b b b b b . 
                . . b 5 5 5 5 5 5 5 5 b 5 d b . 
                . . f 4 d 5 f 1 d 5 b 5 5 b . . 
                . . c 4 4 5 f f 1 b 5 5 d b . . 
                . b 4 4 4 4 b f d 5 5 5 b d b b 
                b 4 4 4 4 4 4 5 b 5 5 d c d d b 
                . b 5 5 5 5 5 5 5 b c c d d d c 
                . b 5 5 5 5 5 5 5 d d d d d b c 
                . b d 5 5 5 5 5 d d d d d d c . 
                . . b b 5 5 5 d d d d d b c . . 
                . . . b b c c c c c c c c . . . 
                `)
            timer.after(1500, function () {
                mySprite.vx = 0
                story.printCharacterText("Such a nice little duck... ")
                Chapter2()
            })
        })
    })
}
function Chapter3() {
    game.showLongText("Chapter 3: Debugging and Changing and and Making Water Settings", DialogLayout.Full)
    story.printCharacterText("Now say something isn't working properly with the animation...")
    story.printCharacterText("Well that's why we have debug blocks to help you at! ")
    story.printCharacterText("If you need to see what tiles are animating use the show water debug tiles")
    TileAnimation.toggleWaterDebug(true)
    timer.after(500, function () {
        mySprite.sayText("Oh! Now I can see what is really water!", 2000, false)
        timer.after(2000, function () {
            story.printCharacterText("You can also reverse the way the animation goes")
            TileAnimation.reverseWaterAnimation(true)
            TileAnimation.toggleWaterDebug(false)
            timer.after(500, function () {
                mySprite.sayText("Um... It's kinda hard to see when they animate!", 1500, false)
                timer.after(1700, function () {
                    TileAnimation.runWaterAnimation(false)
                    tiles.setCurrentTilemap(tilemap`level4`)
                    story.printCharacterText("Whatever!")
                    story.printCharacterText("You can also animate tiles when a sprite is near a certain tile in a range")
                    story.printCharacterText("Setting the parameter to one is ideal for animating when near a sprite")
                    story.printCharacterText("Use the animate water when near [sprite]  with radius 0")
                    TileAnimation.animateNearPlayer(mySprite, 50)
                    mySprite.vx = -80
                    mySprite.sayText("It feels like I'm on ice!", 1500, false)
                    timer.after(1500, function () {
                        mySprite.vx = 0
                        story.printCharacterText("Just try to remember the animation doesn't actually go away you would have to use a clear block")
                        Chapte4()
                    })
                })
            })
        })
    })
}
function Chapter2() {
    game.showLongText("Chapter 2: Changing animation flow", DialogLayout.Full)
    story.printCharacterText("As well as having tile/image animation you can also stop these animations")
    story.printCharacterText("Using water animation enabled and run water animation blocks you can control when ")
    story.printCharacterText("the animation flows")
    TileAnimation.runWaterAnimation(false)
    timer.after(1000, function () {
        mySprite.sayText("Hey what happened to the water???", 2000, false)
        story.printCharacterText("Yes and if you want to fully clear the animation use the clear water animation block ")
        TileAnimation.clearWaterAnimation()
        story.printCharacterText("You can use this to change the animation itself!")
        story.printCharacterText("Like putting our duck in hot lava")
        story.printCharacterText("But make sure you turn animation on ")
        tiles.setCurrentTilemap(tilemap`level3`)
        TileAnimation.runWaterAnimation(true)
        TileAnimation.initWaterAnimation(
            myTiles.tile1,
            sprites.dungeon.hazardLava0,
            sprites.dungeon.hazardLava0,
            sprites.dungeon.hazardLava1
        )
        timer.after(1000, function () {
            timer.after(1000, function () {
                mySprite.setImage(img`
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . b 5 5 b . . . 
                    . . . . . . b b b b b b . . . . 
                    . . . . . b b 5 5 5 5 5 b . . . 
                    . b b b b b 5 5 5 5 5 5 5 b . . 
                    . b d 5 b 5 5 5 5 5 5 5 5 b . . 
                    . . b 5 5 b 5 d 1 f 5 d 4 f . . 
                    . . b d 5 5 b 1 f f 5 4 4 c . . 
                    b b d b 5 5 5 d f b 4 4 4 4 b . 
                    b d d c d 5 5 b 5 4 4 4 4 4 4 b 
                    c d d d c c b 5 5 5 5 5 5 5 b . 
                    c b d d d d d 5 5 5 5 5 5 5 b . 
                    . c d d d d d d 5 5 5 5 5 d b . 
                    . . c b d d d d d 5 5 5 b b . . 
                    . . . c c c c c c c c b b . . . 
                    `)
                mySprite.vx = 130
                mySprite.sayText("Ow!", 500, false)
                timer.after(1000, function () {
                    mySprite.setImage(img`
                        . . . . . . . . . . . . . . . . 
                        . . . . . . . . . . . . . . . . 
                        . . . b 5 5 b . . . . . . . . . 
                        . . . . b b b b b b . . . . . . 
                        . . . b 5 5 5 5 5 b b . . . . . 
                        . . b 5 5 5 5 5 5 5 b b b b b . 
                        . . b 5 5 5 5 5 5 5 5 b 5 d b . 
                        . . f 4 d 5 f 1 d 5 b 5 5 b . . 
                        . . c 4 4 5 f f 1 b 5 5 d b . . 
                        . b 4 4 4 4 b f d 5 5 5 b d b b 
                        b 4 4 4 4 4 4 5 b 5 5 d c d d b 
                        . b 5 5 5 5 5 5 5 b c c d d d c 
                        . b 5 5 5 5 5 5 5 d d d d d b c 
                        . b d 5 5 5 5 5 d d d d d d c . 
                        . . b b 5 5 5 d d d d d b c . . 
                        . . . b b c c c c c c c c . . . 
                        `)
                    mySprite.sayText("Hot!", 500, false)
                    mySprite.vx = -130
                    timer.after(1000, function () {
                        TileAnimation.clearWaterAnimation()
                        tiles.setCurrentTilemap(tilemap`level3`)
                        mySprite.vx = 0
                        mySprite.sayText("Phew!", 2000, false)
                        timer.after(1000, function () {
                            story.printCharacterText("You can also change the speed of the animation")
                            TileAnimation.initWaterAnimation(
                                myTiles.tile1,
                                myTiles.tile2,
                                myTiles.tile1,
                                myTiles.tile3
                            )
                            TileAnimation.setWaterAnimationSpeed(TileAnimation.WaterSpeed.Slow)
                            timer.after(1000, function () {
                                story.printCharacterText("Like if it's starting to get windy!")
                                mySprite.sayText("Wait what", 1000, false)
                                mySprite.fx = 80
                                timer.after(2000, function () {
                                    TileAnimation.setWaterAnimationSpeed(TileAnimation.WaterSpeed.Medium)
                                    mySprite.sayText("Oh no...", 1000, false)
                                    mySprite.vx = 70
                                    timer.after(2000, function () {
                                        TileAnimation.setWaterAnimationSpeed(TileAnimation.WaterSpeed.Fast)
                                        mySprite.sayText("AAAA not the cold air!!!", 1500, false)
                                        mySprite.vx = 120
                                        timer.after(1000, function () {
                                            TileAnimation.setWaterAnimationSpeed(TileAnimation.WaterSpeed.Slow)
                                            mySprite.fx = 0
                                            mySprite.sayText("Okay it's not windy anymore!", 1000, false)
                                            timer.after(1000, function () {
                                                story.printCharacterText("That's for sure...")
                                                Chapter3()
                                            })
                                        })
                                    })
                                })
                            })
                        })
                    })
                })
            })
        })
    })
}
function Chapte4() {
    TileAnimation.setWaterEnabled(false)
    tiles.setCurrentTilemap(tilemap`level4`)
    game.showLongText("Chapter 4: Splash Effects", DialogLayout.Full)
    TileAnimation.setWaterEnabled(true)
    story.printCharacterText("Now in addition to water and tile animation you can make a splash sound using the play splash sound of size block")
    story.printCharacterText("You must type in small, medium, or large depending on how loud you want the sound of the splash")
    TileAnimation.playSplashSound("medium")
    timer.after(2000, function () {
        TileAnimation.runWaterAnimation(false)
        story.printCharacterText("You can also use the trigger water collision effect at player [player] block to change the tiles/images when the player is near")
        TileAnimation.waterCollisionEffect(mySprite)
        mySprite.vx = -80
        mySprite.sayText("WOW!", 1000, false)
        timer.after(1200, function () {
            story.printCharacterText("Now lastly the best way to use this extension is to test out to see what happens!")
            story.printCharacterText("Have fun!")
            game.setGameOverMessage(true, "Enjoy!")
            game.setGameOverEffect(true, effects.bubbles)
            game.gameOver(true)
        })
    })
}
let mySprite: Sprite = null
story.printCharacterText("Welcome folks to the TileAnimation demo!")
story.printCharacterText("Let's learn how to use this extension heading over to chapter 1!")
Chapter1()
