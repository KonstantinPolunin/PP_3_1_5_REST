
$(async function () {
    await allUsers();
});

class User {
    constructor(id, firstname, lastname, age, email, roles, password) {
        this.id = id;
        this.firstname = firstname;
        this.lastname = lastname;
        this.age = age
        this.email = email;
        this.roles = roles;
        this.password = password;
    }
}

class Role {
    constructor(id, role, nameNotPrefix) {
        this.id = id;
        this.role = role;
        this.nameNotPrefix = nameNotPrefix;
    }
}


async function allUsers() {

    fetch("http://localhost:8080/api/admin")
        .then(res => res.json())
        .then(data => {
            const table = document.getElementById("usersTable-tbody");
            data.forEach(user => {
                const tr = document.createElement('tr');
                tr.id = `tr-${user.id}`;
                Object.keys(user).forEach(
                    key => {
                        if (key === 'password') {
                            console.log('user');
                        }

                        else if (key === 'roles') {
                            const td = document.createElement('td');
                            user[key].forEach(
                                role => {
                                    td.textContent += role.nameNotPrefix + ' ';
                                    tr.appendChild(td);

                                }
                            )
                        } else {
                            const td = document.createElement('td');
                            td.textContent = user[key];
                            tr.appendChild(td);
                        }

                        
                    }
                )
                tr.appendChild(editButton(user));
                tr.appendChild(deleteButton(user));
                table.appendChild(tr);
            })

        })
    //Удаление
    const formDelete = document.querySelector(`#delete-form-${user.id}`);
    formDelete.addEventListener('submit', (event) => {
        event.preventDefault(); // предотвращаем отправку формы
        const formData = new FormData(formDelete);
        const data = {};
        for (let [key, value] of formData.entries()) {
            data[key] = value;
        }

        /*fetch('api/admin/users', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(new User(data.id))
        })
            .then(response => response.json())
            .then(data => {

                let button = document.querySelector(`#delete-${user.id} .btn-secondary`);
                button.click();

                const trDelete = document.querySelector(`#tr-${user.id}`)
                trDelete.remove();
            })
            .catch(error => {
                console.error(error);
            });*/
    });


}
// Добавляет кнопку Delete и модальное окно, связь по id юзера
function deleteButton(user) {


    let td = document.createElement("td");

    // HTML код для кнопки
    let button = `<input type="submit" class="btn btn-danger" data-toggle="modal" data-target="#delete-${user.id}" value="Delete"/>`;
    td.insertAdjacentHTML('beforeend', button);
console.log("OK");
    // HTML код для модального окна
    let modal = `
      <div class="modal fade" id="delete-${user.id}" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="editModalLabel">Delete user</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body" id="modal-form-edit">
              <form id="delete-form-${user.id}">

               <div class="form-group">
                   <label for="delete-id-field-${user.id}" class="row font-weight-bold justify-content-center">ID</label>
                   <input type="number" class="form-control" id="delete-id-field-${user.id}" value="${user.id}" name="id" readonly>
               </div>

               <div class="form-group">
                   <label for="delete-firstname-field-${user.id}" class="row font-weight-bold justify-content-center">First Name</label>
                   <input type="text" class="form-control" id="delete-firstname-field-${user.id}" value="${user.firstName}" name="firstName" readonly>
               </div>

               <div class="form-group">
                   <label for="delete-lastname-field-${user.id}" class="row font-weight-bold justify-content-center">Last Name</label>
                   <input type="text" class="form-control" id="delete-lastname-field-${user.id}" value="${user.lastName}" name="lastName" readonly>
               </div>

               <div class="form-group">
                   <label for="delete-age-field-${user.id}" class="row font-weight-bold justify-content-center">Age</label>
                   <input type="number" class="form-control" id="delete-age-field-${user.id}" value="${user.age}" name="age" readonly>
               </div>

               <div class="form-group">
                   <label for="delete-email-field-${user.id}" class="row font-weight-bold justify-content-center">E-mail</label>
                   <input type="email" class="form-control" id="delete-email-field-${user.id}" value="${user.email}" name="email" readonly>
               </div>

               <div class="modal-footer">
                   <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                   <input type="submit" class="btn btn-danger" value="Delete">
               </div>
           </form>
            </div>
          </div>
        </div>
      </div>`
    ;
    td.insertAdjacentHTML('beforeend', modal);

    return td;
}
function editButton(user) {

    let td = document.createElement("td");

    // HTML код для кнопки
    let button = `<input type="submit" class="btn btn-info" data-toggle="modal" data-target="#edit-${user.id}" value="Edit"/>`;
    td.insertAdjacentHTML('beforeend', button);

    // HTML код для модального окна
    let modal = `
      <div class="modal fade" id="edit-${user.id}" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="editModalLabel">Edit user</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body" id="modal-form-edit">
              <form id="edit-form-${user.id}">

               <div class="form-group">
                   <label for="edit-id-field-${user.id}" class="row font-weight-bold justify-content-center">ID</label>
                   <input type="number" class="form-control" id="edit-id-field-${user.id}" value="${user.id}" name="id" readonly>
               </div>

               <div class="form-group">
                   <label for="edit-firstname-field-${user.id}" class="row font-weight-bold justify-content-center">First Name</label>
                   <input type="text" class="form-control" id="edit-firstname-field-${user.id}" value="${user.firstName}" name="firstname">
               </div>

               <div class="form-group">
                   <label for="edit-lastname-field-${user.id}" class="row font-weight-bold justify-content-center">Last Name</label>
                   <input type="text" class="form-control" id="edit-lastname-field-${user.id}" value="${user.lastName}" name="lastname">
               </div>

               <div class="form-group">
                   <label for="edit-age-field-${user.id}" class="row font-weight-bold justify-content-center">Age</label>
                   <input type="number" class="form-control" id="edit-age-field-${user.id}" value="${user.age}" name="age">
               </div>

               <div class="form-group">
                   <label for="edit-email-field-${user.id}" class="row font-weight-bold justify-content-center">E-mail</label>
                   <input type="email" class="form-control" id="edit-email-field-${user.id}" value="${user.email}" name="email">
               </div>

               <div class="form-group">
                   <label for="edit-password-field-${user.id}" class="row font-weight-bold justify-content-center">Password</label>
                   <input type="password" class="form-control" id="edit-password-field-${user.id}" value="" name="password">
               </div>
               
               <div class="form-group">
                   <label for="select-for-roles-edit-${user.id}" class="row font-weight-bold justify-content-center">Role</label>
                   <select multiple class="form-control" id="select-for-roles-edit-${user.id}" name="roles"></select>
               </div>

               <div class="modal-footer">
                   <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                   <input type="submit" class="btn btn-success" value="Edit">
               </div>
           </form>
            </div>
          </div>
        </div>
      </div>`
    ;
    td.insertAdjacentHTML('beforeend', modal);

    return td;
}

