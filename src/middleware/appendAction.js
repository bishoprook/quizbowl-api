import { v4 as uuidv4 } from 'uuid';

const appendAction = db => () => next => action => {
    if (action.id == null) {
        const id = uuidv4();
        action = { id: id, time: new Date().toISOString(), ...action };

        const ref = db.collection('actions').doc(id);
        ref.set(action);
        console.log(`Added to ${id}: ${JSON.stringify(action, null, 2)}`)
    }

    next(action);
};

export default appendAction;