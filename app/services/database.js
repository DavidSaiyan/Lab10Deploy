const sql = require('mssql');
const config = {
    user: 'team3_app_user',
    password: 'zrdUceIeljaKSkP45px6',
    server: 'dsdb.crv91e6hg1p4.us-west-2.rds.amazonaws.com', // You can use 'localhost\\instance' to connect to named instance
    database: 'Team3_ASE_DB',
    options: {
        encrypt: false // Use this if you're on Windows Azure
    }
};

var pool = '';

function connectSql(){
    sql.connect(config).then(function(p){
        pool = p;
    })
}

sql.on('error', function(err){
    console.log(err);
});


function SignIn(user){
    return pool.request()
        .input('Username', sql.NVarChar, user.username)
        .input('Password', sql.NVarChar, user.password)
        .execute('SignIn')
}

function RegisterUser(user){
    console.log(user);
        return pool.request()
            .input('Username', sql.NVarChar, user.username)
            .input('Password', sql.NVarChar, user.password)
            .input('FirstName', sql.NVarChar, user.first)
            .input('LastName', sql.NVarChar, user.last)
            .input('PrimLang', sql.NVarChar, user.primLang)
            .input('SecLang', sql.NVarChar, user.secLang)
            .input('BioTitle', sql.NVarChar, user.bioTitle)
            .input('Bio', sql.NVarChar, user.bio)
            .input('LocationId', sql.Int, 1)
            .input('Provider', sql.NVarChar, user.provider)
            .input('Birthday', sql.NVarChar, user.birthday)
            .execute('RegisterUser')
}

function getRooms(user){
        return pool.request()
            .input('UserId', sql.NVarChar, user.userId)
            .input('Password', sql.NVarChar, user.password)
            .execute('GetRooms')
}

function getGuests(room){
        return pool.request()
            .input('RoomId', sql.NVarChar, room.roomId)
            .execute('GetGuests')
}

function search(query, userId, roomId){
    return pool.request()
        .input('query', sql.NVarChar, query)
        .input('userId', sql.NVarChar, userId)
        .input('roomId', sql.NVarChar, roomId)
        .execute('Search')
}

function InsertMessage(msg){
    console.log(msg)
    return pool.request()
        .input('RoomId', sql.NVarChar, msg.ChatId)
        .input('UserId', sql.NVarChar, msg.UserId)
        .input('MessageText', sql.NVarChar, msg.Message)
        .input('LanguageCode', sql.NVarChar, msg.Language)
        .execute('InsertMessage')
}

function GetMessages(roomId){
    return pool.request()
        .input('RoomId', sql.NVarChar, roomId)
        .execute('GetMessages')
}


function checkIfUserExists(username){
        return pool.request()
            .input('username', sql.NVarChar, username)
            .query('select username from Users where username = @username')
}

function addRoom(data){
        return pool.request()
            .input('name', sql.NVarChar, data.name)
            .input('locationId', sql.Int, 1)
            .input('userId', sql.Int, data.userId)
            .input('isPrivate', sql.Bit, data.isPrivate)
            .input('password', sql.NVarChar, data.password ? data.password : null)
            .input('PrimaryCode', sql.NVarChar, data.primCode)
            .input('SecondaryCode', sql.NVarChar, data.secCode)
            .execute('AddRoom')
}


function addGuest(data){
        return pool.request()
            .input('RoomId', sql.NVarChar, data.roomId)
            .input('GuestId', sql.Int, data.userId)
            .execute('AddGuest')
}

function removeGuest(data){
        return pool.request()
            .input('RoomId', sql.NVarChar, data.roomId)
            .input('GuestId', sql.Int, data.userId)
            .execute('RemoveGuest')
}

function getLanguages(){
        return pool.request()
            .query('select LanguageCode, LanguageDescription from Languages')
}


function addFriend(data) {
        return pool.request()
            .input('UserId', sql.Int, data.userId)
            .input('FriendId', sql.Int, data.friendId)
            .execute('addFriend')
}

function getFriends(data){

        return pool.request()
            .input('UserId', sql.Int, data.userId)
            .execute('GetUserFriends')
}

function close(){
    sql.close();
}

module.exports = {
    connectSql: connectSql,
    SignIn: SignIn,
    RegisterUser: RegisterUser,
    checkIfUserExists: checkIfUserExists,
    getFriends: getFriends,
    addRoom: addRoom,
    getRooms: getRooms,
    getLanguages: getLanguages,
    addFriend: addFriend,
    addGuest: addGuest,
    removeGuest: removeGuest,
    getGuests: getGuests,
    search: search,
    InsertMessage: InsertMessage,
    GetMessages: GetMessages,
    close: close
};