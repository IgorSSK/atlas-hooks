# SAMPLE

This is an API documentation Sample.


## Rotas

- **Http Status Code**

| Status Code | Description  |
| ----------- | ------------ |
| 200         | Ok           |
| 400         | Bad Requet   |
| 401         | Unauthorized |
| 500         | Server Error |

- **Error Response**

~~~typescript
 {
     error: string
 }
~~~

---

### `/api/v1/sample`
![POST](../assets/http-post.png)

HTTP Post.

<details>
  <summary>Parameters</summary>

  * Model
  ~~~typescript
    {
        body: string
    }
  ~~~

  * Example
  ~~~json
    {
        "body": ""
    }
  ~~~
</details>

<details>
  <summary>Response</summary>

  * Model
  ~~~typescript
    {
        id: string
    }
  ~~~

  * Example
  ~~~json
    {
        "id": ""
    }
  ~~~
</details>

---

