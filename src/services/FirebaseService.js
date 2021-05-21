import firebase from '../util/firebase';

const db = firebase.ref('/corona');
let corona = [];

class FirebaseService {
  
  addCustomer = (covid) => {
    db.push(covid);
  };

  getAll() {
    return db;
  }

  get(key) {
    return db.child(key);
  }

  update(key, value) {
    return db.child(key).update(value);
  }

  delete(key) {
    return db.child(key).remove();
  }
}

export default new FirebaseService();