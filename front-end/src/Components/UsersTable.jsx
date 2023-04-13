import React, { useCallback, useContext } from 'react';
import { requestDelete } from '../services/request';
import MyContext from '../context/MyContext';
import '../styles/adminTable.css';
import buttonDelete from '../images/trash.svg';

function UsersTable() {
  const { getUsers, usersList } = useContext(MyContext);

  const removeUser = useCallback(async (id) => {
    try {
      await requestDelete(`/user/${id}`);
      await getUsers();
    } catch (error) {
      console.log(error.message);
    }
  }, [getUsers]);

  return (
    <div>
      <h2 className="adm-titles">Lista de usuários:</h2>
      <table className="usersTable">
        <thead>
          <tr>
            <th>Item</th>
            <th>Nome</th>
            <th>E-mail</th>
            <th>Tipo</th>
            <th>Excluir</th>
          </tr>
        </thead>
        <tbody>
          { usersList.map((item, index) => {
            const { id, name, email, role } = item;
            return (
              <tr key={ index }>
                <td
                  data-testid={ `admin_manage__element-user-table-item-number-${index}` }
                >
                  {index + 1}
                </td>
                <td data-testid={ `admin_manage__element-user-table-name-${index}` }>
                  {name}
                </td>
                <td data-testid={ `admin_manage__element-user-table-email-${index}` }>
                  {email}
                </td>
                <td data-testid={ `admin_manage__element-user-table-role-${index}` }>
                  {role}
                </td>
                <td>
                  {
                    id !== 1 && (
                      <button
                        data-testid={ `admin_manage__element-user-table-remove-${index}` }
                        type="button"
                        onClick={ () => removeUser(id) }
                      >
                        <img
                          className="imgDelete"
                          src={ buttonDelete }
                          alt="botão de deletar"
                        />
                      </button>
                    )
                  }
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default UsersTable;
