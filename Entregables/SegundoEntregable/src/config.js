module.exports= {
    fileSystem: {
        path: './DB'
    },
    mongodb: {
        cnxStr: 'mongodb://localhost/ecommerce',
        options: {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            // useCreateIndex: true,
             serverSelectionTimeoutMS: 5000,
        }
    },
    firebase: {
        "type": "service_account",
        "project_id": "coder-house-backend-d006a",
        "private_key_id": "83f318a49709177062a0dbcdbc24daff88a3be99",
        "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDI/df3/zqMPxWX\n3CzNgpbSAz4u/2wrS5XEzEs1RkLmrQwDk2/Tlm57uaFqezbvNiqPHfOu6CNio81A\n5QJrGrR11zMI5oqNV4XmNO5kEVb5R7hJxAEbo971E3xZKxBQ6y/Ry20CEK9/yLuH\neuX/G1W2NtDlMc7Vxl/SFdAXi4NBmacwJNJbVYY4U6VhMOnlT+53jBsn4XNeODrf\nL20Clm/yIVUV708k12cMph5y7k3uFbvek2vzI/9JSSVQ4n/EL1W40Z95XwGb+J9x\nF+6ybtXhelq3ksFnN+W47otWemwPzDOjctV+XfWmrAwajRSSMnHUKuXCa/qIqgRr\n1z1RbkLjAgMBAAECggEAILcs7bmWIpjsH11fz43HleSgPQ8nYL67YJ6uSTwoDJsz\nPuvDQooUbsAu9YGb1gEXmVcTQK+ZfudRtBPyulNM93dxX6wC9nG+IlQQT6qA4S+a\n4Cru0TxxwKuMzIjVbY5yqK/3jOQBZQfb+nf3MviUkYXHp97dH2/cTfpt9j8nvMgH\nlJ/qd/DUjOg+BCyVGipG3MU3CepuyiTzOEA+/VarwuTIMMY7GxxnJkVlEL4FJ0nc\n1l9v+rJDu8zq10mnFuAipAaePW20BiJIgwp4ItPUtZLHAhWMNZju5MX3SuOX1ih/\nczWCjobrYVqy/wbx+c8jsbEgYqxxAhXDgns6Rg6OtQKBgQDla/454ZzPBfNBxMSp\nZqkZ96dpm8/8P7SIL4ScePPlRljL/yBrCec6iSY+TpMTuUPiGWl42hV+2paMf5Bp\nOt9YF+2JnoNq3yBmdUF2bR2B1hPBMp3BvYiZafgGZfM/iu6pESaI8d+FFtFYMxmX\nfthMgeBb3ocz+ZTOx3CZTlgNpwKBgQDgRrBLa8JsThA2lJ8AV4BroGvCc1/1T72o\nH0iJWFzoolbLW8rsFqFbmARQKXdFjM73xjBuwcsqJUWR7/FCMDO4dkas374k7jOO\nU0aANP/wEhWm7Par5+iR38JPTqbDE8QmD/cWWSBhmsJxuU3cBKBjYnhfic8QoOUa\nX9tKGKQgZQKBgQCqM5ALiOE4hQWOyVfNBSh250///WQzk19vmTEclG78rU+7J675\nOgOdXZpNpyVeAJfn6UpiKgjAb5I48XpFVzPSuw2yhzKf2qDC4kKKhTDa3eMR9Wcs\nEFyC1Cb5ODFZ9sxQCTU5a5eTuPXeJSrbRXNabw/vmAtd9876COP0GDcjCQKBgH+f\n+kaRBcx4B8XngSvCn3OfkHLREPQZ8oUveCmgPQ6tAtMqYylCH4Rt11Z+oj7TyBs7\njugYI7LSDurjLdlKcMQxmjpaAGwnmPMO9HmUr2hAAk5BXoWorLIGMR7MVR2BrAc0\n4pi3EzQ3yxrIJkRj5ZloubM0Sr7dsEH39mQN7af5AoGAJK3LeX7S2G7aBaBt/Ssi\nxrWQAbMv0op/8wHhJMBqh079GupceQSeKrBilERV1nxKvTfUfXC4YLUqePLDyNRB\nHDEMBbVncRg6KkQDQA2yB2jkO61qh3fzzMWSDeJgmiqtvnTqI5sPXSeROZv6qfss\nGvNRy8XciPHUoZayhmAlU0c=\n-----END PRIVATE KEY-----\n",
        "client_email": "firebase-adminsdk-x0f0z@coder-house-backend-d006a.iam.gserviceaccount.com",
        "client_id": "112057672960748637639",
        "auth_uri": "https://accounts.google.com/o/oauth2/auth",
        "token_uri": "https://oauth2.googleapis.com/token",
        "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
        "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-x0f0z%40coder-house-backend-d006a.iam.gserviceaccount.com"
      }
      ,
}