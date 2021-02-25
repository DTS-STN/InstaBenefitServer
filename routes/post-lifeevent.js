/**
 * @swagger
 * tags:
 *  name: LifeEvent
 *  description: evaluate and send notification to user if they are eligible for new benefits based on life events
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     LifeEvent:
 *       type: object
 *       properties:
 *         outOfWork:
 *           type: string
 *           enum: [HFPOOW1, HFPOOW2, HFPOOW3]
 *           description: code for work situation
 *         ableToWork:
 *           type: string
 *           enum: [yes, no]
 *           description: whether or not the person is able to find work
 *         gender:
 *           type: string
 *           enum: [male, female]
 *           description: gender of the individual
 *         incomeDetails:
 *           type: string
 *           enum: [HFPIR1, HFPIR2, HFPIR3]
 *           description: code for income bracket
 *         province:
 *           type: string
 *           enum: [NL, PE, NS, NB. QC, ON, MB, SK, AB, BC, YT, NT, NU]
 *           description: province the individual is in
 *         reasonForSeparation:
 *           type: string
 *           enum: [HFPRE1, HFPRE2, HFPRE3]
 *           description: the reason the person had to leave their job
 *       example:
 *         outOfWork: HFPOOW1
 *         ableToWork: yes
 *         gender: female
 *         incomeDetails: HFPIR3
 *         province: ON
 *         reasonForSeparation: HFPRE1
 */


/**
 * @swagger
 * /life-event:
 *    post:
 *     description: handles a change in life event, checks if a user
 *     tags: [LifeEvent]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LifeEvent'
 *     responses:
 *       200:
 *        description: the event has been received and processed
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/LifeEvent'
 */
const express = require('express');
const Joi = require('joi')
const validateRequest = require("../lib/validateRequest")
const router = express.Router();
const getUserInfo = require("../lib/getUserInfo")
const getBenefits = require("../lib/getBenefits")
const getEligibility = require("../lib/getEligibility")
const getNotifications = require("../lib/getNotifications")
const createNotification = require("../lib/createNotification")
const createApplication = require("../lib/createApplication")
const auth = require("../middlewares/auth")

const handlerFunc = async function(req, res, next) {
    const benefitTypeMapping = {
        "HFPPN1": "EI Regular",
        "HFPPN2": "EI Maternity",
        "HFPPN3": "EI Sickness",
    }

    await getUserInfo(req, next)
    await getNotifications(req, next)
    const eligibility = await getEligibility(req, next)
    await getBenefits(req, eligibility, next)
    let count = 0
    for(const i in req.locals.benefitsData){
        const benefit = req.locals.benefitsData[i]
        if(benefit.service_type === "Internal" && !req.locals.notifications.includes(benefitTypeMapping[benefit.benefit_type])){
            await createApplication(req, benefit.benefit_type, next)
            await createNotification(req, benefit.benefit_type, next)
            count += 1
        }
    }

    res.header("Cache-Control", "no-cache, no-store, must-revalidate");
    res.header("Pragma", "no-cache");
    res.header("Expires", 0);
    res.header("Content-Type", "text/plain")
    res.status(200)
    res.send(`${count}`)
}

const schemaValidator = function(req, res, next){
    const schema = Joi.object({
        outOfWork: Joi.string().valid('HFPOOW1', 'HFPOOW2', 'HFPOOW3').required(),
        ableToWork: Joi.string().valid('yes', 'no').required(),
        gender: Joi.string().valid('male', 'female').required(),
        incomeDetails: Joi.string().valid('HFPIR1', 'HFPIR2', 'HFPIR3').required(),
        province: Joi.string().valid('NL', 'PE', 'NS', 'NB', 'QC', 'ON', 'MB', 'SK', 'AB', 'BC', 'YT', 'NT', 'NU').required(),
        reasonForSeparation: Joi.string().valid('HFPRE1', 'HFPRE2', 'HFPRE3').required(),
    })
    validateRequest(req, next, schema)
}

module.exports.handlerFunc = handlerFunc
module.exports.router = router.post('/life-event', auth, schemaValidator, handlerFunc);
module.exports.route = "/life-event"
