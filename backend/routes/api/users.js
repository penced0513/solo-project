const express = require('express');
const asyncHandler = require('express-async-handler');
const { check } = require('express-validator');

const { setTokenCookie, requireAuth, restoreUser } = require('../../utils/auth');
const { User, UserGroup } = require('../../db/models');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

const validateSignup = [
    check('email')
      .exists({ checkFalsy: true })
      .isEmail()
      .withMessage('Please provide a valid email.'),
    check('username')
      .exists({ checkFalsy: true })
      .isLength({ min: 4 })
      .withMessage('Please provide a username with at least 4 characters.'),
    check('username')
      .not()
      .isEmail()
      .withMessage('Username cannot be an email.'),
    check('password')
      .exists({ checkFalsy: true })
      .isLength({ min: 6 })
      .withMessage('Password must be 6 characters or more.'),
    handleValidationErrors,
  ];

router.post(
  '/',
  validateSignup,
  asyncHandler(async (req, res) => {
    const { email, password, username } = req.body;
    const user = await User.signup({ email, username, password });

    await setTokenCookie(res, user);

    return res.json({
      user,
    });
  }),
);

router.get('/:userId/groups', restoreUser, asyncHandler(async(req,res) => {
  const {userId} = req.params
  
  const userGroups = await UserGroup.findAll({where: {
      userId
  }})
  
  return res.json(userGroups)
}))

router.post('/:userId(\\d+)/groups/:groupId(\\d+)', restoreUser, asyncHandler(async(req,res) => {
  const {userId, groupId} = req.params
  await UserGroup.create({ userId, groupId})
  return res.json("created")
}))


router.delete('/:userId/groups/:groupId', restoreUser, asyncHandler(async(req,res) => {
  const {userId, groupId} = req.params
  const userGroup = await UserGroup.findOne({where: {
      userId,
      groupId
  }})
  await userGroup.destroy()
  return res.json("deleted")
}))

module.exports = router;
