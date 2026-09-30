/* =========================================================
   THE LAST SWING
   SPIDER-MAN APOLOGY MINI GAME
========================================================= */


/* =========================================================
   GLOBAL ELEMENTS
========================================================= */

const loadingScreen =
    document.getElementById("loadingScreen");

const loadingBar =
    document.getElementById("loadingBar");

const loadingText =
    document.getElementById("loadingText");

const spiderSense =
    document.getElementById("spiderSense");

const senseStatus =
    document.getElementById("senseStatus");

const senseInstruction =
    document.getElementById("senseInstruction");

const instructionPopup =
    document.getElementById("instructionPopup");

const popupTitle =
    document.getElementById("popupTitle");

const popupText =
    document.getElementById("popupText");

const popupClose =
    document.getElementById("popupClose");

const comicEffect =
    document.getElementById("comicEffect");


/* =========================================================
   SCENE SYSTEM
========================================================= */

const scenes = document.querySelectorAll(".screen");

function showScene(sceneId) {

    scenes.forEach(function (scene) {
        scene.classList.remove("active");
    });

    const target =
        document.getElementById(sceneId);

    if (target) {
        target.classList.add("active");
    }


    /*
        Spider-Sense only appears during
        actual game stages.
    */

    if (
        sceneId === "level1" ||
        sceneId === "level2" ||
        sceneId === "level3" ||
        sceneId === "level4" ||
        sceneId === "level5"
    ) {

        spiderSense.style.display = "block";

    }

    else {

        spiderSense.style.display = "none";

    }

}


/* =========================================================
   SPIDER-SENSE SYSTEM
========================================================= */

function updateSpiderSense(status, instruction, alert = false) {

    senseStatus.textContent = status;
    senseInstruction.textContent = instruction;

    if (alert) {
        spiderSense.classList.add("active-alert");
    }

    else {
        spiderSense.classList.remove("active-alert");
    }

}


function highlightButton(button) {

    document
        .querySelectorAll(".action-btn")
        .forEach(function (btn) {

            btn.classList.remove("highlight-action");

        });


    if (button) {
        button.classList.add("highlight-action");
    }

}


function highlightRoof(roofNumber) {

    document
        .querySelectorAll(".roof-target")
        .forEach(function (roof) {

            roof.classList.remove("highlight-roof");

        });


    const target =
        document.querySelector(
            `.roof-target[data-roof="${roofNumber}"]`
        );


    if (target) {
        target.classList.add("highlight-roof");
    }

}


/* =========================================================
   POPUP SYSTEM
========================================================= */

function showPopup(title, message) {

    popupTitle.textContent = title;
    popupText.textContent = message;

    instructionPopup.classList.add("show");

}


popupClose.addEventListener("click", function () {

    instructionPopup.classList.remove("show");

});


/* =========================================================
   COMIC FLASH
========================================================= */

function comicFlash() {

    comicEffect.classList.remove("flash");

    void comicEffect.offsetWidth;

    comicEffect.classList.add("flash");

}


/* =========================================================
   LOADING SCREEN
========================================================= */

const loadingMessages = [
    "Initializing...",
    "Connecting to city network...",
    "Scanning rooftops...",
    "Checking web systems...",
    "Tracking movement...",
    "Spider-sense online...",
    "Mission ready..."
];


let loadingProgress = 0;


const loadingInterval =
    setInterval(function () {

        loadingProgress++;

        loadingBar.style.width =
            loadingProgress + "%";


        const messageIndex =
            Math.min(
                Math.floor(loadingProgress / 15),
                loadingMessages.length - 1
            );


        loadingText.textContent =
            loadingMessages[messageIndex];


        if (loadingProgress >= 100) {

            clearInterval(loadingInterval);

        }

    }, 80);


/*
    EXACT 8 SECOND LOADING
*/

setTimeout(function () {

    loadingScreen.classList.remove("active");

    showScene("opening");

}, 8000);


/* =========================================================
   OPENING
========================================================= */

const startBtn =
    document.getElementById("startBtn");


startBtn.addEventListener("click", function () {

    showScene("level1");

    updateSpiderSense(
        "ACTION REQUIRED",
        "Follow the Spider-Sense."
    );


    /*
        Start Stage 1
    */

    startLevel1();

});


/* =========================================================
   STAGE 1 — THE ENCOUNTER
========================================================= */


/*
    The player must successfully complete
    THREE required actions.

    The sequence is deliberately shown
    clearly through Spider-Sense.
*/

const actionButtons =
    document.querySelectorAll(".action-btn");

const level1Message =
    document.getElementById("level1Message");

const level1Next =
    document.getElementById("level1Next");

const level1Instruction =
    document.getElementById("level1Instruction");

const actionEffect =
    document.getElementById("actionEffect");


const level1Sequence = [
    "attack",
    "web",
    "dodge"
];


let level1Step = 0;
let level1Completed = false;


function startLevel1() {

    level1Step = 0;
    level1Completed = false;

    level1Next.disabled = true;

    level1Message.textContent =
        "The villain is moving in.";

    setLevel1Instruction();

}


function setLevel1Instruction() {

    const requiredAction =
        level1Sequence[level1Step];


    let readableAction;


    if (requiredAction === "attack") {
        readableAction = "ATTACK";
    }

    else if (requiredAction === "web") {
        readableAction = "WEB";
    }

    else {
        readableAction = "DODGE";
    }


    level1Instruction.textContent =
        "Use " + readableAction + ".";


    updateSpiderSense(
        "ACTION REQUIRED",
        "Use: " + readableAction,
        true
    );


    const button =
        document.querySelector(
            `.action-btn[data-action="${requiredAction}"]`
        );


    highlightButton(button);

}


function performLevel1Animation(action) {

    actionEffect.className =
        "action-effect";


    if (action === "web") {

        actionEffect.classList.add(
            "web-effect"
        );

    }

    else if (action === "attack") {

        actionEffect.classList.add(
            "attack-effect"
        );

        comicFlash();

    }

    else if (action === "dodge") {

        const hero =
            document.querySelector(
                ".player-character"
            );


        hero.style.transform =
            "translateX(-35px)";


        setTimeout(function () {

            hero.style.transform =
                "";

        }, 350);

    }

}


actionButtons.forEach(function (button) {

    button.addEventListener("click", function () {

        if (level1Completed) {
            return;
        }


        const action =
            button.dataset.action;

        const requiredAction =
            level1Sequence[level1Step];


        /*
            WRONG ACTION
        */

        if (action !== requiredAction) {

            level1Message.textContent =
                "Not yet. Spider-Sense says " +
                requiredAction.toUpperCase() + ".";


            updateSpiderSense(
                "WRONG MOVE",
                "Try: " + requiredAction.toUpperCase(),
                true
            );


            return;

        }


        /*
            CORRECT ACTION
        */

        performLevel1Animation(action);


        level1Step++;


        if (level1Step < level1Sequence.length) {

            level1Message.textContent =
                "Nice. Keep going.";

            setTimeout(function () {

                setLevel1Instruction();

            }, 300);

        }

        else {

            level1Completed = true;

            highlightButton(null);


            level1Instruction.textContent =
                "Stage cleared.";


            level1Message.textContent =
                "Nice work. The villain is retreating.";


            updateSpiderSense(
                "STAGE CLEAR",
                "The villain is getting away."
            );


            level1Next.disabled = false;

            comicFlash();

        }

    });

});


level1Next.addEventListener("click", function () {

    if (!level1Completed) {
        return;
    }


    showScene("level2");

    startLevel2();

});


/* =========================================================
   STAGE 2 — ROOFTOP CHASE
========================================================= */


/*
    The player must reach 3 correct rooftops.

    The route is predetermined so the logic
    is clear and reliable.
*/

const roofButtons =
    document.querySelectorAll(".roof-target");

const chaseMessage =
    document.getElementById("chaseMessage");

const chaseProgress =
    document.getElementById("chaseProgress");

const level2Next =
    document.getElementById("level2Next");

const level2Instruction =
    document.getElementById("level2Instruction");

const swingingSpiderman =
    document.getElementById("swingingSpiderman");

const chasingVillain =
    document.getElementById("chasingVillain");

const swingWeb =
    document.getElementById("swingWeb");


const roofSequence = [2, 4, 1];

let chaseStep = 0;
let level2Completed = false;


function startLevel2() {

    chaseStep = 0;
    level2Completed = false;

    level2Next.disabled = true;

    chaseProgress.textContent =
        "0 / 3";

    chaseMessage.textContent =
        "The villain is running.";

    setNextRoof();

}


function setNextRoof() {

    const target =
        roofSequence[chaseStep];


    highlightRoof(target);


    level2Instruction.textContent =
        "Reach rooftop " + target + ".";


    updateSpiderSense(
        "TARGET MOVING",
        "Reach rooftop " + target + ".",
        true
    );

}


function moveSpidermanToRoof(roofNumber) {

    const positions = {
        1: {
            left: "10%",
            bottom: "48%"
        },

        2: {
            left: "34%",
            bottom: "62%"
        },

        3: {
            left: "58%",
            bottom: "52%"
        },

        4: {
            left: "78%",
            bottom: "69%"
        }
    };


    const position =
        positions[roofNumber];


    swingingSpiderman.style.left =
        position.left;

    swingingSpiderman.style.bottom =
        position.bottom;


    swingWeb.style.opacity = "1";

    swingWeb.style.left =
        position.left;

    swingWeb.style.bottom =
        position.bottom;

    swingWeb.style.height =
        "120px";


    setTimeout(function () {

        swingWeb.style.opacity = "0";

    }, 500);

}


roofButtons.forEach(function (button) {

    button.addEventListener("click", function () {

        if (level2Completed) {
            return;
        }


        const selectedRoof =
            Number(button.dataset.roof);

        const requiredRoof =
            roofSequence[chaseStep];


        /*
            WRONG ROOFTOP
        */

        if (selectedRoof !== requiredRoof) {

            chaseMessage.textContent =
                "Wrong rooftop. He's not there.";

            updateSpiderSense(
                "WRONG ROOFTOP",
                "Try rooftop " + requiredRoof + ".",
                true
            );


            return;

        }


        /*
            CORRECT ROOFTOP
        */

        moveSpidermanToRoof(selectedRoof);

        chaseStep++;


        chaseProgress.textContent =
            chaseStep + " / 3";


        comicFlash();


        if (chaseStep < roofSequence.length) {

            chaseMessage.textContent =
                "THWIP! Keep chasing him.";

            setTimeout(function () {

                setNextRoof();

            }, 500);

        }

        else {

            level2Completed = true;

            document
                .querySelectorAll(".roof-target")
                .forEach(function (roof) {

                    roof.classList.remove(
                        "highlight-roof"
                    );

                });


            level2Instruction.textContent =
                "You caught up with him.";


            chaseMessage.textContent =
                "Got him! He's trapped ahead.";


            updateSpiderSense(
                "STAGE CLEAR",
                "Target located."
            );


            level2Next.disabled = false;

        }

    });

});


level2Next.addEventListener("click", function () {

    if (!level2Completed) {
        return;
    }


    showScene("level3");

    startLevel3();

});


/* =========================================================
   STAGE 3 — WEB TRAP
========================================================= */


/*
    The villain moves continuously.

    Player moves the mouse/finger to aim.

    Click / tap = FIRE WEB.

    Three successful hits are required.
*/

const webTrapGame =
    document.getElementById("webTrapGame");

const movingVillain =
    document.getElementById("movingVillain");

const aimReticle =
    document.getElementById("aimReticle");

const webProjectile =
    document.getElementById("webProjectile");

const webMessage =
    document.getElementById("webMessage");

const webProgress =
    document.getElementById("webProgress");

const level3Next =
    document.getElementById("level3Next");

const level3Instruction =
    document.getElementById("level3Instruction");

const webLock =
    document.getElementById("webLock");


let webHits = 0;
let level3Completed = false;

let villainX = 70;
let villainY = 100;

let aimX = 0;
let aimY = 0;

let villainMoveInterval = null;
let webTrapRunning = false;


function startLevel3() {

    webHits = 0;
    level3Completed = false;

    level3Next.disabled = true;

    webProgress.textContent =
        "0 / 3";

    webMessage.textContent =
        "Target moving.";

    webLock.style.opacity = "0";

    webTrapRunning = true;

    placeVillain();

    startVillainMovement();


    showPopup(
        "WEB TRAP",
        "Aim at the moving villain and click when the reticle is over him. You need 3 successful web hits."
    );


    updateSpiderSense(
        "TARGET MOVING",
        "Aim at the villain and fire.",
        true
    );

}


function placeVillain() {

    movingVillain.style.left =
        villainX + "px";

    movingVillain.style.top =
        villainY + "px";

}


function moveVillain() {

    if (!webTrapRunning) {
        return;
    }


    const areaWidth =
        webTrapGame.clientWidth;

    const areaHeight =
        webTrapGame.clientHeight;


    const maxX =
        Math.max(80, areaWidth - 120);

    const maxY =
        Math.max(70, areaHeight - 140);


    villainX =
        40 + Math.random() * (maxX - 40);

    villainY =
        30 + Math.random() * (maxY - 30);


    movingVillain.style.left =
        villainX + "px";

    movingVillain.style.top =
        villainY + "px";


    checkAimDistance();

}


function startVillainMovement() {

    if (villainMoveInterval) {
        clearInterval(villainMoveInterval);
    }


    villainMoveInterval =
        setInterval(function () {

            moveVillain();

        }, 850);

}


function stopVillainMovement() {

    webTrapRunning = false;


    if (villainMoveInterval) {

        clearInterval(
            villainMoveInterval
        );

        villainMoveInterval = null;

    }

}


/*
    Convert pointer position into
    game-relative position.
*/

function updateAim(clientX, clientY) {

    const rect =
        webTrapGame.getBoundingClientRect();


    aimX =
        clientX - rect.left;

    aimY =
        clientY - rect.top;


    aimReticle.style.left =
        aimX + "px";

    aimReticle.style.top =
        aimY + "px";


    checkAimDistance();

}


function checkAimDistance() {

    const villainCenterX =
        villainX + 29;

    const villainCenterY =
        villainY + 50;


    const distance =
        Math.sqrt(
            Math.pow(
                aimX - villainCenterX,
                2
            ) +
            Math.pow(
                aimY - villainCenterY,
                2
            )
        );


    if (distance < 70) {

        aimReticle.classList.add(
            "locked"
        );


        updateSpiderSense(
            "TARGET IN RANGE",
            "THWIP NOW!",
            true
        );

    }

    else {

        aimReticle.classList.remove(
            "locked"
        );

        updateSpiderSense(
            "TARGET MOVING",
            "Aim at the villain."
        );

    }

}


/*
    Mouse aiming
*/

webTrapGame.addEventListener(
    "mousemove",
    function (event) {

        updateAim(
            event.clientX,
            event.clientY
        );

    }
);


/*
    Touch aiming
*/

webTrapGame.addEventListener(
    "touchmove",
    function (event) {

        const touch =
            event.touches[0];


        if (!touch) {
            return;
        }


        updateAim(
            touch.clientX,
            touch.clientY
        );


        event.preventDefault();

    },
    {
        passive: false
    }
);


/*
    Mouse click
*/

webTrapGame.addEventListener(
    "click",
    function (event) {

        fireWeb(
            event.clientX,
            event.clientY
        );

    }
);


/*
    Touch tap
*/

webTrapGame.addEventListener(
    "touchend",
    function (event) {

        const touch =
            event.changedTouches[0];


        if (!touch) {
            return;
        }


        fireWeb(
            touch.clientX,
            touch.clientY
        );


        event.preventDefault();

    },
    {
        passive: false
    }
);


function fireWeb(clientX, clientY) {

    if (!webTrapRunning || level3Completed) {
        return;
    }


    updateAim(
        clientX,
        clientY
    );


    const villainCenterX =
        villainX + 29;

    const villainCenterY =
        villainY + 50;


    const distance =
        Math.sqrt(
            Math.pow(
                aimX - villainCenterX,
                2
            ) +
            Math.pow(
                aimY - villainCenterY,
                2
            )
        );


    /*
        Miss
    */

    if (distance > 70) {

        webMessage.textContent =
            "Miss! Track him with your aim.";

        updateSpiderSense(
            "WEB MISSED",
            "Aim closer to the villain.",
            true
        );


        return;

    }


    /*
        Successful hit
    */

    webHits++;


    webProgress.textContent =
        webHits + " / 3";


    webMessage.textContent =
        "THWIP! Web connected!";


    updateSpiderSense(
        "WEB CONNECTED",
        "One step closer.",
        true
    );


    shootWebAnimation(
        aimX,
        aimY,
        villainCenterX,
        villainCenterY
    );


    comicFlash();


    /*
        Villain gets briefly stuck
    */

    movingVillain.style.transform =
        "scale(0.85) rotate(5deg)";


    setTimeout(function () {

        movingVillain.style.transform =
            "";

    }, 250);


    if (webHits >= 3) {

        completeLevel3();

    }

}


function shootWebAnimation(
    startX,
    startY,
    targetX,
    targetY
) {

    const distance =
        Math.sqrt(
            Math.pow(
                targetX - startX,
                2
            ) +
            Math.pow(
                targetY - startY,
                2
            )
        );


    const angle =
        Math.atan2(
            targetY - startY,
            targetX - startX
        ) * 180 / Math.PI;


    webProjectile.style.left =
        startX + "px";

    webProjectile.style.top =
        startY + "px";

    webProjectile.style.width =
        distance + "px";

    webProjectile.style.height =
        "3px";

    webProjectile.style.transform =
        "rotate(" + angle + "deg)";

    webProjectile.style.transformOrigin =
        "left center";

    webProjectile.style.opacity =
        "1";


    setTimeout(function () {

        webProjectile.style.opacity =
            "0";

    }, 250);

}


function completeLevel3() {

    level3Completed = true;

    stopVillainMovement();


    level3Instruction.textContent =
        "TARGET LOCKED.";


    webMessage.textContent =
        "LOCKED! The villain can't move.";


    updateSpiderSense(
        "TARGET SECURED",
        "Web trap successful."
    );


    webLock.style.left =
        (villainX + 29) + "px";

    webLock.style.top =
        (villainY + 50) + "px";


    webLock.style.opacity =
        "1";


    movingVillain.style.transform =
        "scale(0.75)";


    comicFlash();


    level3Next.disabled = false;

}


level3Next.addEventListener("click", function () {

    if (!level3Completed) {
        return;
    }


    showScene("level4");

    startLevel4();

});


/* =========================================================
   STAGE 4 — SPIDER-SENSE
========================================================= */

const senseTargets =
    document.querySelectorAll(".sense-target");

const senseGameMessage =
    document.getElementById("senseGameMessage");

const level4Instruction =
    document.getElementById("level4Instruction");

const senseFlash =
    document.getElementById("senseFlash");

const level4Next =
    document.getElementById("level4Next");


let level4Completed = false;


function startLevel4() {

    level4Completed = false;

    level4Next.disabled = true;

    level4Instruction.textContent =
        "Find the source of the danger.";

    senseGameMessage.textContent =
        "Something is nearby...";


    updateSpiderSense(
        "SPIDER-SENSE ACTIVE",
        "Find the hidden threat.",
        true
    );


    /*
        The targets move slowly.
    */

    senseTargets.forEach(
        function (target, index) {

            target.style.animation =
                "targetFloat " +
                (2 + index * 0.3) +
                "s ease-in-out infinite";

        }
    );


    showPopup(
        "SPIDER-SENSE",
        "Something is hiding nearby. Click the target that feels dangerous."
    );

}


senseTargets.forEach(function (target) {

    target.addEventListener("click", function () {

        if (level4Completed) {
            return;
        }


        const isThreat =
            target.dataset.threat === "true";


        /*
            WRONG
        */

        if (!isThreat) {

            senseGameMessage.textContent =
                "Nothing there. Trust your Spider-Sense.";

            updateSpiderSense(
                "FALSE SIGNAL",
                "Keep searching.",
                true
            );


            target.textContent =
                "×";


            setTimeout(function () {

                target.textContent =
                    "?";

            }, 500);


            return;

        }


        /*
            CORRECT
        */

        level4Completed = true;


        target.classList.add(
            "threat-found"
        );


        target.textContent =
            "!";


        senseFlash.classList.add(
            "active"
        );


        setTimeout(function () {

            senseFlash.classList.remove(
                "active"
            );

        }, 400);


        level4Instruction.textContent =
            "Threat detected.";


        senseGameMessage.textContent =
            "There it is. Spider-Sense doesn't lie.";


        updateSpiderSense(
            "THREAT DETECTED",
            "Stage cleared."
        );


        comicFlash();


        level4Next.disabled = false;

    });

});


level4Next.addEventListener("click", function () {

    if (!level4Completed) {
        return;
    }


    showScene("level5");

    startLevel5();

});


/* =========================================================
   STAGE 5 — FINAL BATTLE
========================================================= */


/*
    IMPORTANT RULES:

    Boss starts with 5 HP.

    Player has ONLY ATTACK.

    Boss has a dodge chance.

    A dodge means NO damage.

    Five successful direct attacks
    are required to defeat him.

    Boss automatically attacks Spider-Man.
*/


const attackBossBtn =
    document.getElementById("attackBossBtn");

const bossHealthFill =
    document.getElementById("bossHealthFill");

const bossHealthText =
    document.getElementById("bossHealthText");

const directHits =
    document.getElementById("directHits");

const battleMessage =
    document.getElementById("battleMessage");

const battleInstruction =
    document.getElementById("battleInstruction");

const battleSpiderman =
    document.getElementById("battleSpiderman");

const finalVillain =
    document.getElementById("finalVillain");

const battleImpact =
    document.getElementById("battleImpact");

const bossDodgeEffect =
    document.getElementById("bossDodgeEffect");

const bossAttackEffect =
    document.getElementById("bossAttackEffect");

const victoryMessage =
    document.getElementById("victoryMessage");

const finalContinue =
    document.getElementById("finalContinue");


let bossHealth = 5;
let successfulHits = 0;
let level5Completed = false;

let bossBusy = false;


/*
    Boss dodge chance.

    30% means roughly 3 out of 10
    attacks can be dodged.
*/

const bossDodgeRate = 0.30;


/*
    Spider-Man health is intentionally
    generous so the battle doesn't become
    frustrating.
*/

let spiderHealth = 3;


/*
    Prevent repeated clicking while the
    boss is performing an animation.
*/

let attackLocked = false;


function startLevel5() {

    bossHealth = 5;
    successfulHits = 0;

    spiderHealth = 3;

    level5Completed = false;

    attackLocked = false;
    bossBusy = false;


    bossHealthFill.style.width =
        "100%";


    bossHealthText.textContent =
        "5 / 5";


    directHits.textContent =
        "0 / 5";


    battleMessage.textContent =
        "The villain is watching you.";


    battleInstruction.textContent =
        "Wait for an opening, then ATTACK.";


    attackBossBtn.disabled =
        false;


    attackBossBtn.style.opacity =
        "1";


    victoryMessage.style.display =
        "none";


    finalContinue.disabled =
        true;


    finalVillain.style.opacity =
        "1";


    finalVillain.style.transform =
        "";


    updateSpiderSense(
        "FINAL BATTLE",
        "Wait for an opening. ATTACK.",
        true
    );


    showPopup(
        "FINAL BATTLE",
        "The villain can dodge your attacks. There is no dodge button. Wait for your opening and attack. You need 5 direct hits."
    );

}


/* =========================================================
   PLAYER ATTACK
========================================================= */

attackBossBtn.addEventListener(
    "click",
    function () {

        if (
            level5Completed ||
            attackLocked ||
            bossHealth <= 0
        ) {
            return;
        }


        attackLocked = true;


        battleInstruction.textContent =
            "ATTACK!";


        updateSpiderSense(
            "ATTACK",
            "Web-sense locked on.",
            true
        );


        /*
            30% chance that boss dodges.
        */

        const dodged =
            Math.random() < bossDodgeRate;


        if (dodged) {

            bossDodges();

        }

        else {

            successfulBossHit();

        }

    }
);


/* =========================================================
   BOSS DODGE
========================================================= */

function bossDodges() {

    battleMessage.textContent =
        "MISS! He dodged!";


    updateSpiderSense(
        "ATTACK MISSED",
        "He moved too fast.",
        true
    );


    /*
        Dodge animation
    */

    finalVillain.style.transform =
        "translateX(70px)";


    bossDodgeEffect.style.opacity =
        "1";


    bossDodgeEffect.style.left =
        "48%";

    bossDodgeEffect.style.top =
        "45%";


    setTimeout(function () {

        finalVillain.style.transform =
            "";


        bossDodgeEffect.style.opacity =
            "0";

    }, 350);


    /*
        Boss attacks after dodging.
    */

    setTimeout(function () {

        bossAttacksSpiderMan();

    }, 550);

}


/* =========================================================
   SUCCESSFUL BOSS HIT
========================================================= */

function successfulBossHit() {

    successfulHits++;

    bossHealth--;


    bossHealthFill.style.width =
        ((bossHealth / 5) * 100) + "%";


    bossHealthText.textContent =
        bossHealth + " / 5";


    directHits.textContent =
        successfulHits + " / 5";


    battleMessage.textContent =
        "DIRECT HIT!";


    updateSpiderSense(
        "DIRECT HIT",
        successfulHits + " / 5 hits landed.",
        true
    );


    /*
        Impact animation
    */

    finalVillain.style.transform =
        "translateX(0) scale(0.88)";


    battleImpact.style.left =
        "70%";

    battleImpact.style.top =
        "40%";


    battleImpact.classList.remove(
        "active"
    );


    void battleImpact.offsetWidth;


    battleImpact.classList.add(
        "active"
    );


    comicFlash();


    setTimeout(function () {

        finalVillain.style.transform =
            "";

    }, 250);


    /*
        Five successful hits = victory.
    */

    if (successfulHits >= 5) {

        defeatBoss();

        return;

    }


    /*
        Boss automatically attacks.
    */

    setTimeout(function () {

        bossAttacksSpiderMan();

    }, 600);

}


/* =========================================================
   BOSS AUTOMATIC ATTACK
========================================================= */

function bossAttacksSpiderMan() {

    if (level5Completed) {
        return;
    }


    battleMessage.textContent =
        "He's attacking!";


    updateSpiderSense(
        "INCOMING",
        "The villain attacks!",
        true
    );


    /*
        Boss attack animation
    */

    finalVillain.style.transform =
        "translateX(-25px)";


    bossAttackEffect.style.left =
        "30%";

    bossAttackEffect.style.top =
        "45%";


    bossAttackEffect.style.opacity =
        "1";


    battleSpiderman.style.transform =
        "translateX(-15px)";


    setTimeout(function () {

        finalVillain.style.transform =
            "";


        bossAttackEffect.style.opacity =
            "0";


        battleSpiderman.style.transform =
            "";

    }, 350);


    spiderHealth--;


    /*
        Spider-Man takes the hit.
    */

    if (spiderHealth <= 0) {

        /*
            We don't end the game.

            Spider-Man gets back up.
            This keeps the game fun rather
            than frustrating.
        */

        spiderHealth = 3;


        battleMessage.textContent =
            "Spider-Man gets back up.";


        updateSpiderSense(
            "KEEP GOING",
            "You've still got this."
        );

    }


    /*
        New opening.
    */

    setTimeout(function () {

        if (!level5Completed) {

            battleInstruction.textContent =
                "There's your opening. ATTACK.";

            updateSpiderSense(
                "OPENING DETECTED",
                "ATTACK NOW.",
                true
            );

            attackLocked = false;

        }

    }, 500);

}


/* =========================================================
   BOSS DEFEATED
========================================================= */

function defeatBoss() {

    level5Completed = true;


    attackLocked = true;


    attackBossBtn.disabled =
        true;


    attackBossBtn.style.opacity =
        "0.35";


    battleInstruction.textContent =
        "TARGET SECURED.";


    battleMessage.textContent =
        "The final hit landed.";


    updateSpiderSense(
        "MISSION COMPLETE",
        "The city is safe."
    );


    /*
        Boss defeat animation
    */

    finalVillain.style.transform =
        "translateY(30px) scale(0.8)";


    setTimeout(function () {

        finalVillain.style.opacity =
            "0";

    }, 450);


    comicFlash();


    /*
        Victory card
    */

    setTimeout(function () {

        victoryMessage.style.display =
            "block";


        finalContinue.disabled =
            false;

    }, 800);

}


/* =========================================================
   FINAL SCENE
========================================================= */

finalContinue.addEventListener(
    "click",
    function () {

        if (!level5Completed) {
            return;
        }


        showScene("finalScene");

    }
);


/* =========================================================
   EXTRA CSS ANIMATION CREATED BY JS
   For Stage 4 moving targets.
========================================================= */

const dynamicStyle =
    document.createElement("style");


dynamicStyle.textContent = `

@keyframes targetFloat {

    0%, 100% {
        margin-top: 0;
    }

    50% {
        margin-top: -8px;
    }

}

`;


document.head.appendChild(dynamicStyle);


/* =========================================================
   INITIAL STATE
========================================================= */

spiderSense.style.display =
    "none";


instructionPopup.classList.remove(
    "show"
);


/*
    Make sure Continue buttons cannot
    accidentally work before their stages
    are completed.
*/

level1Next.disabled = true;
level2Next.disabled = true;
level3Next.disabled = true;
level4Next.disabled = true;
finalContinue.disabled = true;


/*
    Start with loading screen only.
*/

showScene("loadingScreen");