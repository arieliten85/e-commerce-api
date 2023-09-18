export const userMock = {
  dataUserRegister: {
    firstName: "test_name",
    lastName: "test_lasName",
    email: "test@correo.com",
    password: "123456",
  },

  dataUserLogin: {
    email: "no_existe@correo.com",
    password: "151515",
  },

  dataUserFindByEmail: {
    firstName: "test_name",
    lastName: "test_lasName",
    email: "testssss@correo.com",
    password: "$2b$10$xIao4BlWnoKI5gS/A6QRbOvb/5fbrLLubhdQrvVr.tupRiHQ.F/Hy",
    isEmailActive: true,
  },
  dataUser_account_not_confimm: {
    first_name: "test_name",
    last_name: "test_lasName",
    email: "test_email@correo.com",
    password: "$2b$10$xIao4BlWnoKI5gS/A6QRbOvb/5fbrLLubhdQrvVr.tupRiHQ.F/Hy",
    isEmailActive: false,
  },

  dataLoginForm: {
    email: "test@correo.com",
    password: "$2b$10$xIao4BlWnoKI5gS/A6QRbOvb/5fbrLLubhdQrvVr.tupRiHQ.F/Hy",
  },

  allUser: [
    {
      id: 1,
      first_name: "Usuario 1",
      last_name: "Usuario 1",
      email: "usuario1@example.com",
    },
    {
      id: 2,
      first_name: "Usuario 2",
      last_name: "Usuario 2",
      email: "usuario2@example.com",
    },
  ],

  oneUser: {
    id: 1,
    first_name: "Usuario 1",
    last_name: "Usuario 1",
    email: "usuario1@example.com",
  },
  updatedUserData: {
    first_name: "UpdatedFirstName_EDIT",
    last_name: "UpdatedLastName",
    email: "updated@example.com",
  },
};
