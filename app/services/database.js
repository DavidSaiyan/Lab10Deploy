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

function SignIn(user){
    close();
    return sql.connect(config).then(function(pool){
        return pool.request()
            .input('Username', sql.NVarChar, user.username)
            .input('Password', sql.NVarChar, user.password)
            .execute('SignIn')
    });
}

function RegisterUser(user){
    console.log(user);
    return sql.connect(config).then(function(pool){
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
    });
}

function getRooms(user){
    close();
    return sql.connect(config).then(function(pool){
        return pool.request()
            .input('UserId', sql.NVarChar, user.userId)
            .input('Password', sql.NVarChar, user.password)
            .execute('GetRooms')
    });
}

function getGuests(room){
    close();
    return sql.connect(config).then(function(pool){
        return pool.request()
            .input('RoomId', sql.NVarChar, room.roomId)
            .execute('GetGuests')
    });
}


function checkIfUserExists(username){
    close();
    return sql.connect(config).then(function(pool){
        return pool.request()
            .input('username', sql.NVarChar, username)
            .query('select username from Users where username = @username')
    });
}

function addRoom(data){
    close();
    return sql.connect(config).then(function(pool){
        return pool.request()
            .input('name', sql.NVarChar, data.name)
            .input('locationId', sql.Int, 1)
            .input('userId', sql.Int, data.userId)
            .input('isPrivate', sql.Bit, data.isPrivate)
            .input('password', sql.NVarChar, data.password ? data.password : null)
            .input('PrimaryCode', sql.NVarChar, data.primCode)
            .input('SecondaryCode', sql.NVarChar, data.secCode)
            .execute('AddRoom')
    });
}


function addGuest(data){
    close();
    return sql.connect(config).then(function(pool){
        return pool.request()
            .input('RoomId', sql.NVarChar, data.roomId)
            .input('GuestId', sql.Int, data.userId)
            .execute('AddGuest')
    });
}

function removeGuest(data){
    close();
    return sql.connect(config).then(function(pool){
        return pool.request()
            .input('RoomId', sql.NVarChar, data.roomId)
            .input('GuestId', sql.Int, data.userId)
            .execute('RemoveGuest')
    });
}

function getLanguages(){
    close();
    return sql.connect(config).then(function(pool){
        return pool.request()
            .query('select LanguageCode, LanguageDescription from Languages')
    });
}


function addFriend(data) {
    close();
    return sql.connect(config).then(function(pool){
        return pool.request()
            .input('UserId', sql.Int, data.userId)
            .input('FriendId', sql.Int, data.friendId)
            .execute('addFriend')
    });
}

function getFriends(data){
    close();
    return sql.connect(config).then(function(pool){
        return pool.request()
            .input('UserId', sql.Int, data.userId)
            .execute('GetUserFriends')
    })
}

function close(){
    sql.close();
}

module.exports = {
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
    close: close
};