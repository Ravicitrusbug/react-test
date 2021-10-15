export const studentReducer = (state, action) => {
    var list = JSON.parse(localStorage.getItem('students'))
    switch (action.type) {
        case 'INSERT':
            list.push(action.payload)
            localStorage.setItem('students', JSON.stringify(list))
            return { list, currentIndex: -1 }
        case 'UPDATE':
            list[state.currentIndex] = action.payload
            localStorage.setItem('students', JSON.stringify(list))
            return { list, currentIndex: -1 }

        case 'UPDATE-INDEX':
            return { list, currentIndex: action.payload }

        case 'DELETE':
            list.splice(action.payload, 1)
            localStorage.setItem('students', JSON.stringify(list))
            return { list, currentIndex: -1 }
        default:
            return state;
    }

}



export default studentReducer