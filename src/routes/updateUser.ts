import UserInfo from '../database/models/userModel'
import express from 'express'
const routerUser = express.Router()

routerUser.patch('/update/:id', async (req, res) => {
    const getId = req.params.id
    const { userName, profilePicture} = req.body
    const updatedData = {
        userName,
        profilePicture
    }
    const [getRows, rows] = await UserInfo.update(
        updatedData,
        { where: { id: getId }, returning: true } 
    )

    if (getRows === 1) {
        res.status(200).json({ rows })
    }
    return { success: 'ok', updatedUserInfo: rows[0] };

})


routerUser.get('/getuser', async (req, res) => {
    const user = await UserInfo.findAll()
    res.send(user)
    
})
export default routerUser