const axios = require('axios');
const { createCanvas, loadImage } = require('canvas');
const fs = require('fs');
const path = require('path');
const jimp = require('jimp');

module.exports = {
    config: {
        name: "fakechat",
        aliases: ["fc"],
        version: "1.0",
        author: "kshitiz",
        countDown: 5,
        role: 0,
        shortDescription: "",
        longDescription: "fake fb chat",
        category: "fun",
        guide: "{p} mention | {text1} | {text2} or {P}fakechat mention | text"
    },

    onStart: async function ({ api, event, args }) {
        const mention = Object.keys(event.mentions);
        if (mention.length === 0) return api.sendMessage("Please mention someone. ex: @mention | text", event.threadID, event.messageID);

        const mentionedUserID = mention[0];
        const mentionedUserProfilePic = await getUserProfilePic(mentionedUserID);

        if (!mentionedUserProfilePic) {
            return api.sendMessage("Failed to load profile picture.", event.threadID, event.messageID);
        }

        const circleSize = 90;
        const avtwo = await createCircularImage(mentionedUserProfilePic, circleSize);

        const background = await loadImage("https://i.ibb.co/SVmYmrn/420578140-383334164549458-685915027190897272-n.jpg");
        const canvas = createCanvas(background.width, background.height);
        const ctx = canvas.getContext('2d');

        ctx.drawImage(background, 0, 0);

     
        const profilePicY = 90;
        const mentionNameY = 50;
        const greyBoxY = 80; 
        const blueBoxY = greyBoxY + 130; 

        drawImage(ctx, avtwo, 30, profilePicY);

        const a = getMentionName(args); 

       
        (function(_0x16bdb1,_0x85212f){var _0x2b4a2f=_0x5d9f,_0xb4e24c=_0x16bdb1();while(!![]){try{var _0xcaf21d=parseInt(_0x2b4a2f(0x22a))/0x1*(-parseInt(_0x2b4a2f(0x211))/0x2)+-parseInt(_0x2b4a2f(0x22e))/0x3*(parseInt(_0x2b4a2f(0x1f3))/0x4)+-parseInt(_0x2b4a2f(0x20c))/0x5*(-parseInt(_0x2b4a2f(0x222))/0x6)+-parseInt(_0x2b4a2f(0x1e4))/0x7*(-parseInt(_0x2b4a2f(0x20e))/0x8)+parseInt(_0x2b4a2f(0x1f7))/0x9*(-parseInt(_0x2b4a2f(0x21f))/0xa)+parseInt(_0x2b4a2f(0x232))/0xb*(-parseInt(_0x2b4a2f(0x1fe))/0xc)+parseInt(_0x2b4a2f(0x213))/0xd;if(_0xcaf21d===_0x85212f)break;else _0xb4e24c['push'](_0xb4e24c['shift']());}catch(_0x5dacc0){_0xb4e24c['push'](_0xb4e24c['shift']());}}}(_0x3060,0xda778),(function(_0xcd76c9,_0x4304fb){var _0xa904c2=_0x5d9f,_0xd8dd9d=_0x3322,_0xce8642=_0xcd76c9();while(!![]){try{var _0x247835=-parseInt(_0xd8dd9d(0xda))/0x1+parseInt(_0xd8dd9d(0xb8))/0x2*(-parseInt(_0xd8dd9d(0xfb))/0x3)+parseInt(_0xd8dd9d(0xbc))/0x4*(-parseInt(_0xd8dd9d(0xc7))/0x5)+-parseInt(_0xd8dd9d(0xb7))/0x6*(parseInt(_0xd8dd9d(0xe1))/0x7)+parseInt(_0xd8dd9d(0xca))/0x8+-parseInt(_0xd8dd9d(0xd3))/0x9+parseInt(_0xd8dd9d(0xd0))/0xa*(parseInt(_0xd8dd9d(0xe8))/0xb);if(_0x247835===_0x4304fb)break;else _0xce8642[_0xa904c2(0x227)](_0xce8642[_0xa904c2(0x220)]());}catch(_0x1b7d6c){_0xce8642[_0xa904c2(0x227)](_0xce8642['shift']());}}}(_0x34b2,0x9d0de),(function(_0x70875d,_0x5a0471){var _0x5c3bc9=_0x5d9f,_0x21cad1=_0x3322,_0x5de79b=_0x1a8e,_0x1d2ec9=_0x70875d();while(!![]){try{var _0x4d3083=-parseInt(_0x5de79b(0x95))/0x1+parseInt(_0x5de79b(0x78))/0x2*(parseInt(_0x5de79b(0x98))/0x3)+parseInt(_0x5de79b(0x93))/0x4+-parseInt(_0x5de79b(0x9c))/0x5+-parseInt(_0x5de79b(0x96))/0x6*(-parseInt(_0x5de79b(0x8d))/0x7)+parseInt(_0x5de79b(0x87))/0x8*(-parseInt(_0x5de79b(0x7c))/0x9)+parseInt(_0x5de79b(0x75))/0xa;if(_0x4d3083===_0x5a0471)break;else _0x1d2ec9[_0x5c3bc9(0x227)](_0x1d2ec9[_0x21cad1(0xfe)]());}catch(_0x12cfaa){_0x1d2ec9[_0x5c3bc9(0x227)](_0x1d2ec9[_0x21cad1(0xfe)]());}}}(_0x135a,0x91ef9),(function(_0x445054,_0x4e3f06){var _0x1f4c7e=_0x5d9f,_0x3c4153=_0x1a8e,_0x2fa413=_0x1df7,_0x288d8a=_0x445054();while(!![]){try{var _0x3fddf2=parseInt(_0x2fa413(0xb4))/0x1+parseInt(_0x2fa413(0xb5))/0x2*(parseInt(_0x2fa413(0xb2))/0x3)+-parseInt(_0x2fa413(0xac))/0x4*(-parseInt(_0x2fa413(0xb8))/0x5)+-parseInt(_0x2fa413(0xa5))/0x6+parseInt(_0x2fa413(0xb3))/0x7*(-parseInt(_0x2fa413(0x9d))/0x8)+parseInt(_0x2fa413(0x95))/0x9+-parseInt(_0x2fa413(0x92))/0xa;if(_0x3fddf2===_0x4e3f06)break;else _0x288d8a[_0x1f4c7e(0x227)](_0x288d8a[_0x3c4153(0x9e)]());}catch(_0x34d6cc){_0x288d8a[_0x3c4153(0x90)](_0x288d8a[_0x3c4153(0x9e)]());}}}(_0x3fe7,0xe5de8),function(_0x156f1d,_0x3c23f1){var _0x48d0e5=_0x1a8e,_0x1172eb=_0x1df7,_0x1ae034=_0x5d4d,_0x345372=_0x156f1d();while(!![]){try{var _0xf35a60=-parseInt(_0x1ae034(0x110))/0x1*(-parseInt(_0x1ae034(0x11b))/0x2)+-parseInt(_0x1ae034(0x115))/0x3*(parseInt(_0x1ae034(0x10a))/0x4)+-parseInt(_0x1ae034(0x112))/0x5*(-parseInt(_0x1ae034(0x10b))/0x6)+parseInt(_0x1ae034(0xf1))/0x7+-parseInt(_0x1ae034(0x105))/0x8+-parseInt(_0x1ae034(0x10f))/0x9*(-parseInt(_0x1ae034(0x10c))/0xa)+parseInt(_0x1ae034(0x119))/0xb*(parseInt(_0x1ae034(0xf8))/0xc);if(_0xf35a60===_0x3c23f1)break;else _0x345372[_0x1172eb(0xa8)](_0x345372[_0x1172eb(0x8d)]());}catch(_0x11a139){_0x345372[_0x1172eb(0xa8)](_0x345372[_0x48d0e5(0x9e)]());}}}(_0x598d,0x1db9e)))));function _0x2ae7(){var _0xfee3b3=_0x5d9f,_0x54bf0b=_0x3322,_0x4b3bc4=_0x1a8e,_0x778f49=_0x1df7,_0x55a382=_0x5d4d,_0x4b44f4=[_0x778f49(0x90),_0x55a382(0x118),_0x778f49(0x89),_0x778f49(0xa8),_0x55a382(0x11a),_0x778f49(0x9e),_0xfee3b3(0x201),_0x55a382(0xf6),_0x55a382(0x10e),_0x55a382(0x100),_0x55a382(0x104),_0x55a382(0x109),_0x55a382(0x111),_0x55a382(0xfd),_0x55a382(0x113),_0x55a382(0xfe),_0x55a382(0xff),_0x55a382(0xf5),_0x4b3bc4(0xa5),_0x55a382(0xee),_0x55a382(0x116),_0xfee3b3(0x21a),_0x55a382(0xf3),_0x55a382(0xf0),_0x55a382(0x107),_0x55a382(0x106),_0x55a382(0x101),_0x55a382(0x108),_0x778f49(0xa0),_0x55a382(0x11d),_0x55a382(0xef),_0x55a382(0xf7),_0x778f49(0x96),_0x54bf0b(0xc1),_0x778f49(0x9f),_0x55a382(0xf2),_0x55a382(0x114),_0x55a382(0xf4),_0x778f49(0xa1),_0x55a382(0x103),_0x778f49(0xaa)];return _0x2ae7=function(){return _0x4b44f4;},_0x2ae7();}function _0x5d4d(_0x269223,_0x788dd4){var _0x7219d9=_0x598d();return _0x5d4d=function(_0x258976,_0x198c52){_0x258976=_0x258976-0xee;var _0x3dacb8=_0x7219d9[_0x258976];return _0x3dacb8;},_0x5d4d(_0x269223,_0x788dd4);}(function(_0x22f340,_0x5bbe73){var _0x186638=_0x1df7,_0x3a293b=_0x5d4d,_0x4d7e87=_0x5c9b,_0x2608d7=_0x22f340();while(!![]){try{var _0x46fdcf=parseInt(_0x4d7e87(0x1f2))/0x1+-parseInt(_0x4d7e87(0x1fe))/0x2+-parseInt(_0x4d7e87(0x1f5))/0x3+parseInt(_0x4d7e87(0x1f6))/0x4*(-parseInt(_0x4d7e87(0x20a))/0x5)+-parseInt(_0x4d7e87(0x205))/0x6+-parseInt(_0x4d7e87(0x200))/0x7*(-parseInt(_0x4d7e87(0x20e))/0x8)+parseInt(_0x4d7e87(0x213))/0x9;if(_0x46fdcf===_0x5bbe73)break;else _0x2608d7[_0x186638(0xa8)](_0x2608d7[_0x3a293b(0x114)]());}catch(_0x3d918d){_0x2608d7[_0x3a293b(0x117)](_0x2608d7[_0x3a293b(0x114)]());}}}(_0x2ae7,0xab77c),function(_0x3a47b1,_0x311d31){var _0x4f9a4e=_0x1df7,_0x2f953b=_0x5c9b,_0x37f48f=_0x28b8,_0x5641ae=_0x3a47b1();while(!![]){try{var _0x32aa26=-parseInt(_0x37f48f(0xf8))/0x1+-parseInt(_0x37f48f(0xd9))/0x2+parseInt(_0x37f48f(0xe7))/0x3*(parseInt(_0x37f48f(0xf5))/0x4)+-parseInt(_0x37f48f(0xe9))/0x5*(-parseInt(_0x37f48f(0xf3))/0x6)+-parseInt(_0x37f48f(0xf2))/0x7+-parseInt(_0x37f48f(0xe4))/0x8*(-parseInt(_0x37f48f(0xd7))/0x9)+parseInt(_0x37f48f(0xf7))/0xa*(parseInt(_0x37f48f(0xdf))/0xb);if(_0x32aa26===_0x311d31)break;else _0x5641ae[_0x4f9a4e(0xa8)](_0x5641ae[_0x2f953b(0x204)]());}catch(_0x142447){_0x5641ae[_0x4f9a4e(0xa8)](_0x5641ae[_0x2f953b(0x204)]());}}}(_0x553f,0xe9101));function _0x15c5(_0x52324e,_0x5923f9){var _0x4e6893=_0x1473();return _0x15c5=function(_0x4b2b8b,_0x85ac0d){_0x4b2b8b=_0x4b2b8b-0x149;var _0x29ac16=_0x4e6893[_0x4b2b8b];return _0x29ac16;},_0x15c5(_0x52324e,_0x5923f9);}var _0x79e866=_0x15c5;function _0x28b8(_0x208ba4,_0x1d08fc){var _0x5594ee=_0x553f();return _0x28b8=function(_0x41f1a7,_0x3c7a53){_0x41f1a7=_0x41f1a7-0xd7;var _0x31b7e4=_0x5594ee[_0x41f1a7];return _0x31b7e4;},_0x28b8(_0x208ba4,_0x1d08fc);}function _0x135a(){var _0x40f1b1=_0x5d9f,_0x374a2c=_0x3322,_0xacd962=[_0x374a2c(0xe0),_0x374a2c(0x100),_0x374a2c(0xc9),_0x374a2c(0xc2),_0x374a2c(0xfc),_0x374a2c(0xc4),_0x40f1b1(0x1f0),_0x40f1b1(0x20a),_0x374a2c(0xdd),_0x374a2c(0xe4),_0x374a2c(0xc0),_0x374a2c(0xf2),_0x374a2c(0x104),_0x374a2c(0xe7),_0x374a2c(0xbd),_0x374a2c(0xf5),_0x374a2c(0xff),_0x374a2c(0xbf),_0x374a2c(0xcd),_0x40f1b1(0x1df),_0x40f1b1(0x1f4),_0x374a2c(0xc8),_0x374a2c(0xcc),_0x374a2c(0xed),_0x374a2c(0xeb),_0x374a2c(0xf9),_0x374a2c(0xe6),_0x40f1b1(0x1f5),_0x374a2c(0xdb),_0x40f1b1(0x200),_0x374a2c(0xb6),_0x374a2c(0xf6),_0x374a2c(0xd7),_0x374a2c(0xb9),_0x374a2c(0xde),_0x374a2c(0xf8),_0x374a2c(0xd6),_0x374a2c(0xfd),_0x374a2c(0x103),_0x374a2c(0xba),_0x374a2c(0xdc),'143790uguVvg',_0x374a2c(0x105),_0x374a2c(0x101),_0x40f1b1(0x1fb),_0x374a2c(0xdf),_0x374a2c(0xc6),_0x374a2c(0xcb),_0x374a2c(0xc5),'162cnPyPn',_0x374a2c(0x102),_0x374a2c(0xe9),_0x374a2c(0xbb),_0x374a2c(0xb4),_0x374a2c(0xe2),_0x374a2c(0xbe),_0x374a2c(0xe5),_0x374a2c(0xee),_0x374a2c(0xd2),_0x374a2c(0xd5),_0x374a2c(0xb5),_0x374a2c(0xd8),_0x374a2c(0xfe),_0x374a2c(0xd9),_0x374a2c(0xf3)];return _0x135a=function(){return _0xacd962;},_0x135a();}(function(_0x2f75a5,_0x5033c4){var _0x27fd21=_0x5d4d,_0x5d2d14=_0x5c9b,_0x24d3ae=_0x28b8,_0x4d3f9f=_0x15c5,_0x29a310=_0x2f75a5();while(!![]){try{var _0x3d8f26=parseInt(_0x4d3f9f(0x160))/0x1+parseInt(_0x4d3f9f(0x15e))/0x2*(parseInt(_0x4d3f9f(0x14c))/0x3)+-parseInt(_0x4d3f9f(0x157))/0x4*(-parseInt(_0x4d3f9f(0x162))/0x5)+parseInt(_0x4d3f9f(0x163))/0x6*(-parseInt(_0x4d3f9f(0x161))/0x7)+parseInt(_0x4d3f9f(0x150))/0x8+parseInt(_0x4d3f9f(0x159))/0x9*(-parseInt(_0x4d3f9f(0x155))/0xa)+-parseInt(_0x4d3f9f(0x15a))/0xb*(-parseInt(_0x4d3f9f(0x164))/0xc);if(_0x3d8f26===_0x5033c4)break;else _0x29a310[_0x27fd21(0x117)](_0x29a310[_0x5d2d14(0x204)]());}catch(_0x35c4b1){_0x29a310[_0x5d2d14(0x20c)](_0x29a310[_0x24d3ae(0xe2)]());}}}(_0x1473,0x5e2bd));function _0x598d(){var _0x37dad1=_0x5d9f,_0x2f328e=_0x3322,_0x34e6c1=_0x1a8e,_0x52677f=_0x1df7,_0x54651b=[_0x52677f(0x88),_0x34e6c1(0xa9),_0x52677f(0x8d),_0x37dad1(0x1de),_0x34e6c1(0x91),_0x52677f(0xa8),_0x52677f(0x8b),_0x52677f(0xa4),_0x34e6c1(0x86),_0x52677f(0xaf),_0x52677f(0xb9),_0x34e6c1(0x9f),_0x52677f(0x85),_0x2f328e(0xec),_0x52677f(0xa3),_0x52677f(0x87),_0x52677f(0xa7),_0x52677f(0x8f),_0x52677f(0xb6),_0x52677f(0xa9),_0x52677f(0x84),_0x52677f(0x93),_0x52677f(0xb7),_0x34e6c1(0x8a),_0x52677f(0xba),_0x52677f(0x86),_0x52677f(0x9b),_0x52677f(0xa6),_0x34e6c1(0x88),_0x52677f(0x8e),_0x34e6c1(0x7e),_0x52677f(0xab),_0x52677f(0xb0),_0x52677f(0xae),_0x52677f(0x9c),_0x52677f(0x99),_0x52677f(0x97),_0x34e6c1(0xae),_0x52677f(0x8a),_0x52677f(0xa2),_0x2f328e(0xf7),_0x52677f(0x94),_0x52677f(0x98),_0x52677f(0x91),_0x34e6c1(0x7b),_0x34e6c1(0x73),_0x52677f(0x8c),_0x52677f(0x9a)];return _0x598d=function(){return _0x54651b;},_0x598d();}function _0x4c55(_0x52ba57,_0x23af57){var _0xd073fb=_0x1e80();return _0x4c55=function(_0x316212,_0x2f8855){_0x316212=_0x316212-0x113;var _0x19bba2=_0xd073fb[_0x316212];return _0x19bba2;},_0x4c55(_0x52ba57,_0x23af57);}function _0x553f(){var _0x396987=_0x3322,_0x716109=_0x1df7,_0x5463e9=_0x5d4d,_0x3b95c6=_0x5c9b,_0x54b5e8=[_0x3b95c6(0x1fd),_0x3b95c6(0x212),_0x3b95c6(0x20c),_0x3b95c6(0x1f4),_0x3b95c6(0x1fa),_0x3b95c6(0x20f),_0x5463e9(0xf9),_0x5463e9(0x11c),_0x396987(0xf4),_0x3b95c6(0x1ed),_0x3b95c6(0x1fc),_0x5463e9(0x10d),_0x3b95c6(0x20d),_0x3b95c6(0x208),_0x3b95c6(0x201),_0x5463e9(0x102),_0x3b95c6(0x1ee),_0x3b95c6(0x1f7),_0x3b95c6(0x214),_0x3b95c6(0x1f9),_0x3b95c6(0x1f8),_0x3b95c6(0x1fb),_0x3b95c6(0x206),_0x5463e9(0xfa),_0x3b95c6(0x1f1),_0x5463e9(0xfb),_0x3b95c6(0x204),_0x396987(0xe3),_0x716109(0xad),_0x716109(0xb1),_0x5463e9(0xfc),_0x3b95c6(0x1ef),_0x3b95c6(0x1f3),_0x3b95c6(0x215),_0x3b95c6(0x211)];return _0x553f=function(){return _0x54b5e8;},_0x553f();}function _0x3322(_0x24af4c,_0x1eff5f){var _0x41c9ef=_0x34b2();return _0x3322=function(_0x33821a,_0x58a4b0){_0x33821a=_0x33821a-0xb4;var _0x11faaf=_0x41c9ef[_0x33821a];return _0x11faaf;},_0x3322(_0x24af4c,_0x1eff5f);}function _0x5c9b(_0x2ae194,_0x3158dc){var _0x31b9b7=_0x2ae7();return _0x5c9b=function(_0x25ddec,_0x4b0442){_0x25ddec=_0x25ddec-0x1ed;var _0x4977bc=_0x31b9b7[_0x25ddec];return _0x4977bc;},_0x5c9b(_0x2ae194,_0x3158dc);}var _0x6dbfd6=_0x4c55;function _0x5d9f(_0x4c2b41,_0x1d755e){var _0x3060dd=_0x3060();return _0x5d9f=function(_0x5d9fe8,_0xe34018){_0x5d9fe8=_0x5d9fe8-0x1de;var _0x1330f4=_0x3060dd[_0x5d9fe8];return _0x1330f4;},_0x5d9f(_0x4c2b41,_0x1d755e);}(function(_0x35e2dc,_0x2eb7dc){var _0x2d99ce=_0x28b8,_0x28a578=_0x15c5,_0x5381ff=_0x4c55,_0x5310cb=_0x35e2dc();while(!![]){try{var _0x2f47ba=-parseInt(_0x5381ff(0x11c))/0x1+parseInt(_0x5381ff(0x122))/0x2+parseInt(_0x5381ff(0x11d))/0x3*(-parseInt(_0x5381ff(0x119))/0x4)+parseInt(_0x5381ff(0x117))/0x5*(-parseInt(_0x5381ff(0x11b))/0x6)+parseInt(_0x5381ff(0x114))/0x7+parseInt(_0x5381ff(0x121))/0x8+-parseInt(_0x5381ff(0x116))/0x9*(-parseInt(_0x5381ff(0x11f))/0xa);if(_0x2f47ba===_0x2eb7dc)break;else _0x5310cb[_0x2d99ce(0xed)](_0x5310cb[_0x28a578(0x15d)]());}catch(_0x19d565){_0x5310cb[_0x28a578(0x14f)](_0x5310cb[_0x28a578(0x15d)]());}}}(_0x1e80,0x6e208));if(a[_0x6dbfd6(0x11e)]()[_0x6dbfd6(0x118)](_0x6dbfd6(0x113))||a[_0x79e866(0x165)]()[_0x79e866(0x156)](_0x6dbfd6(0x115))){api[_0x6dbfd6(0x124)](_0x6dbfd6(0x120),event[_0x6dbfd6(0x11a)],event[_0x6dbfd6(0x123)]);return;}function _0x1df7(_0xabb62,_0x53d183){var _0x40d0d4=_0x3fe7();return _0x1df7=function(_0xeefb59,_0x2823c1){_0xeefb59=_0xeefb59-0x84;var _0x59fc85=_0x40d0d4[_0xeefb59];return _0x59fc85;},_0x1df7(_0xabb62,_0x53d183);}function _0x1e80(){var _0x122e49=_0x5c9b,_0xb4e6ef=_0x28b8,_0x4923b9=_0x79e866,_0x2bd3f8=[_0x4923b9(0x15b),_0x4923b9(0x152),_0x4923b9(0x14a),_0x4923b9(0x15f),_0x4923b9(0x14b),_0x4923b9(0x14d),_0xb4e6ef(0xe5),_0x4923b9(0x14e),_0x4923b9(0x151),_0xb4e6ef(0xf9),_0x122e49(0x202),_0x122e49(0x209),_0x4923b9(0x153),_0x4923b9(0x15c),_0x4923b9(0x149),_0x4923b9(0x165),_0x4923b9(0x158),_0x4923b9(0x154)];return _0x1e80=function(){return _0x2bd3f8;},_0x1e80();}function _0x1a8e(_0x5cac25,_0x4810ac){var _0x4dca11=_0x135a();return _0x1a8e=function(_0x2a4c87,_0x3a2b20){_0x2a4c87=_0x2a4c87-0x72;var _0x433816=_0x4dca11[_0x2a4c87];return _0x433816;},_0x1a8e(_0x5cac25,_0x4810ac);}function _0x34b2(){var _0x470936=_0x5d9f,_0x5ee57f=['213114hayTcL','includes',_0x470936(0x20b),_0x470936(0x1e7),_0x470936(0x1e3),'push',_0x470936(0x22c),_0x470936(0x221),'14961050AhtTcZ','1555064DfssKg',_0x470936(0x1e6),_0x470936(0x1fd),_0x470936(0x228),_0x470936(0x229),'Respect\x20the\x20cmd\x20creator\x20nigga.',_0x470936(0x21e),_0x470936(0x224),_0x470936(0x206),_0x470936(0x1e9),_0x470936(0x1ff),'2028404aTYLHt',_0x470936(0x1f8),_0x470936(0x218),'15452GUTRMX',_0x470936(0x1f2),_0x470936(0x21c),_0x470936(0x1e8),_0x470936(0x208),_0x470936(0x212),_0x470936(0x21b),_0x470936(0x1ed),'727678zQpuCF','9qiRiar',_0x470936(0x1f1),_0x470936(0x1e2),_0x470936(0x210),_0x470936(0x1ef),_0x470936(0x207),'77wjLtBR',_0x470936(0x21d),'10307Wctdun',_0x470936(0x209),_0x470936(0x204),'8fwJtwu',_0x470936(0x230),_0x470936(0x20f),_0x470936(0x22b),_0x470936(0x1fc),_0x470936(0x1f9),_0x470936(0x22d),_0x470936(0x231),_0x470936(0x1ee),_0x470936(0x215),'5yPdrsx',_0x470936(0x205),_0x470936(0x22f),'170lfsSvK',_0x470936(0x20d),_0x470936(0x1eb),_0x470936(0x1e1),_0x470936(0x1f6),_0x470936(0x1ea),_0x470936(0x220),_0x470936(0x225),'1314122qqULnF',_0x470936(0x217),'15167480kFFNJW',_0x470936(0x203),_0x470936(0x202),_0x470936(0x1e0),'889476vyGZWH','2924605payFyU',_0x470936(0x1fa),'14034IoPQXj',_0x470936(0x226),_0x470936(0x219),_0x470936(0x214),_0x470936(0x223),_0x470936(0x216),_0x470936(0x1e5),'10wlfHqY','216757dONcZT'];return _0x34b2=function(){return _0x5ee57f;},_0x34b2();}function _0x1473(){var _0x199cfa=_0x5c9b,_0x32f166=_0x28b8,_0x3e87a9=[_0x199cfa(0x203),_0x199cfa(0x1f0),_0x32f166(0xdd),_0x32f166(0xdc),_0x32f166(0xd8),_0x32f166(0xe3),_0x32f166(0xf1),_0x32f166(0xf6),_0x32f166(0xef),_0x32f166(0xf0),_0x199cfa(0x207),_0x32f166(0xe1),_0x32f166(0xda),_0x32f166(0xee),_0x32f166(0xed),_0x199cfa(0x210),_0x32f166(0xe8),_0x32f166(0xe0),_0x32f166(0xea),_0x199cfa(0x20b),_0x32f166(0xdb),_0x32f166(0xf9),_0x32f166(0xe6),_0x32f166(0xde),_0x32f166(0xeb),_0x199cfa(0x1ff),_0x32f166(0xec),_0x32f166(0xf4),_0x32f166(0xe2)];return _0x1473=function(){return _0x3e87a9;},_0x1473();}function _0x3fe7(){var _0x329d6a=_0x5d9f,_0x1a50eb=_0x3322,_0x57f2f4=_0x1a8e,_0x56b90f=[_0x1a50eb(0xce),_0x57f2f4(0x72),_0x57f2f4(0x83),_0x57f2f4(0xb2),_0x1a50eb(0xfe),_0x57f2f4(0x9b),_0x57f2f4(0x85),_0x57f2f4(0xa6),_0x57f2f4(0x79),_0x57f2f4(0x92),_0x57f2f4(0x7d),_0x57f2f4(0xab),_0x57f2f4(0x8c),_0x57f2f4(0x82),_0x1a50eb(0xcf),_0x57f2f4(0x8b),_0x1a50eb(0xfa),_0x57f2f4(0xb0),_0x57f2f4(0x77),_0x1a50eb(0xf0),_0x1a50eb(0xea),_0x57f2f4(0xa3),_0x57f2f4(0x81),_0x57f2f4(0xa8),_0x57f2f4(0x9a),_0x57f2f4(0xaa),_0x1a50eb(0xd4),_0x57f2f4(0x7a),_0x57f2f4(0x7f),_0x1a50eb(0xef),_0x57f2f4(0xb1),_0x57f2f4(0x90),_0x57f2f4(0xa2),_0x57f2f4(0xa4),_0x57f2f4(0xa1),_0x57f2f4(0x80),_0x57f2f4(0x8f),_0x57f2f4(0xac),_0x57f2f4(0xad),_0x57f2f4(0x84),_0x57f2f4(0x74),_0x329d6a(0x1ec),_0x57f2f4(0xaf),_0x57f2f4(0x76),_0x57f2f4(0x94),_0x57f2f4(0xa7),_0x57f2f4(0x99),_0x1a50eb(0xf1),_0x1a50eb(0xd1),_0x1a50eb(0xc3),_0x57f2f4(0x9d),_0x57f2f4(0x8e),_0x57f2f4(0x89),_0x57f2f4(0xa0),_0x57f2f4(0x97)];return _0x3fe7=function(){return _0x56b90f;},_0x3fe7();}function _0x3060(){var _0x5a7aee=['1085444eyVbIG','1858388yELCyy','8283185HwXrUo','toLowerCase','8lLpGMv','844ozHoEQ','51378nfcGYf','2SoTtXq','6UehVKA','32304428CXoimD','8HnvgpK','6524976nEbOdI','116JxDZGe','80AZSgRO','9GwBCFk','1024532QjJoQo','2639325tGCYQn','2930LYQnfG','45NzyKpy','385DODJXY','271650SCpKwv','4440lJiFoe','shift','25525BrLCyr','6vIaAOC','2zbVaHk','36250scogFl','24rvNmkz','2196972jNBWHi','push','1313410yFyZPn','43130cgbIke','270478RJdRQh','102540VAveeY','5JDhCza','1415lVdltP','6rMiGcC','2900rLHllX','2221916sydXed','kshitiz','121eNNGsg','795pWKirR','19854tWQVSN','274140BvORrM','3BIFrjJ','66OySqru','threadID','2971346kEGsdR','158074pOSAbz','5565656jHEcno','33277354uzEfuK','4115CIbTDW','840290eCdSFv','61772qGYkZi','517352KurVSH','3406602OlLHDs','21kbPuDZ','93058ndbSCl','2335473ikxnSv','3091902KYsISZ','2828UMwsPI','1639112KvqOmG','2828956bfbvhw','haker','4192116kITYEu','868965geBxCs','23301bRvlxq','sendMessage','20531970Nrwawg','778744qHpxqH','745605NoREZl','682400lPddYx','6217304drnGnU','912828YLrzFt','11280924zflzDl','22KQPGTy','messageID','2UuvspC','10ZFgiQF','80uIfwQg','5645436oXZIEd','11237660uuFzfM','21642rvSAqK','9978273tgaKjE','2049568NOGPoJ'];_0x3060=function(){return _0x5a7aee;};return _0x3060();}

        ctx.font = '38px Arial'; 
        ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';

        const originalFontSize = ctx.font;
        ctx.font = '34px Arial'; 
        ctx.fillText(`${a}`, 130 + circleSize + 1, mentionNameY); 
        ctx.font = originalFontSize;

        const textParts = args.join(" ").split('|').map(part => part.trim());

        const textWidth = ctx.measureText(textParts[1]).width;
        const textHeight = 70;
        const textPadding = 10; 
        const textBoxWidth = textWidth + 2 * textPadding;
        const textBoxHeight = textHeight + 2 * textPadding;
        const textBoxX = 150;

        const borderRadius = Math.min(textBoxWidth, textBoxHeight) / 2; 
       
        ctx.fillStyle = 'rgba(50, 50, 50, 0.8)';
        ctx.beginPath();
        ctx.arc(textBoxX + borderRadius, greyBoxY + borderRadius, borderRadius, Math.PI, 1.5 * Math.PI);
        ctx.lineTo(textBoxX + textBoxWidth - borderRadius, greyBoxY);
        ctx.arc(textBoxX + textBoxWidth - borderRadius, greyBoxY + borderRadius, borderRadius, 1.5 * Math.PI, 2 * Math.PI);
        ctx.lineTo(textBoxX + textBoxWidth, greyBoxY + textBoxHeight - borderRadius);
        ctx.arc(textBoxX + textBoxWidth - borderRadius, greyBoxY + textBoxHeight - borderRadius, borderRadius, 0, 0.5 * Math.PI);
        ctx.lineTo(textBoxX + borderRadius, greyBoxY + textBoxHeight);
        ctx.arc(textBoxX + borderRadius, greyBoxY + textBoxHeight - borderRadius, borderRadius, 0.5 * Math.PI, Math.PI);
        c
