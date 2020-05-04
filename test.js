var express = require('express');
var app = express();
// var mysql = require('mysql');
var fs = require('fs');


app.use("*", function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    if (req.method === 'OPTIONS') {
        res.send(200);
    } else {
        next();
    }
});

const route = {
    "path": "/emploee",
    "component": "Layout",
    "children": [
        {
            "path": "emploee",
            "name": "emploee",
            "component": "emploee/emploee",
            "meta": {
                "title": "emploee",
                "icon": "emploee"
            }
        }
    ]
};
app.get('/route', function (req, res) {
    fs.readFile('./router.json', function (err, data) {
        if (err) {
            return console.error(err);
        }
        console.log(data);
        let person = data.toString;
        person = JSON.parse(person);
        person.router.push(route);
        let str = JSON.stringify(person);
        fs.writeFile('./router.json',str, function(err) {
            if(err) {
                return false;
            }
            console.log("新增成功");
        })
    })
    res.send("ok");
})
app.post('/add', function (req, res) {
    req.on('data', function (data) {
        const obj = JSON.parse(data);
        // const route = {
        //     "path": "/form",
        //     "component": "Layout",
        //     "children": [
        //         {
        //             "path": "index",
        //             "name": "Form",
        //             "component": "form/index",
        //             "meta": {
        //                 "title": "Form",
        //                 "icon": "form"
        //             }
        //         }
        //     ]
        // };
        if (obj.data.nameEn) {
            fs.mkdir('./src/views/' + obj.data.nameEn, function (error) {
                if (error) {
                    console.log(error);
                    return false;
                }
                console.log("创建目录成功！");
                fs.writeFile('./src/views/' + obj.data.nameEn + '/index.vue', '', function (error) {
                    if (error) {
                        console.log(error);
                        return false;
                    }
                    console.log('写入index.vue成功');
                })
            })
            // fs.readFile('./router.json', function (err, data) {
            //     if (err) {
            //         return console.error(err);
            //     }
            //     let person = data.toString;
            //     person.data.push(obj.data)
            // })
        }
    })

    return res.send('你好');
})

app.listen(8800);