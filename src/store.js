import { create } from 'zustand';
import axios from 'axios';

const useStore = create((set, get) => ({
  allTickets: [],
  allUsers: [],
  loading: false,
  selectedData: [],

  fetchAllData: async () => {
    set({ loading: true });
    try {
      const { data } = await axios.get("https://api.quicksell.co/v1/internal/frontend-assignment/");
      set({
        allTickets: data.tickets,
        allUsers: data.users,
        loading: false,
      });
    } catch (error) {
      console.error("Error fetching data:", error);
      set({ loading: false, allTickets: [], allUsers: [] });
    }
  },

//   selectData: (group, orderValue) => {
//     const { allTickets, allUsers } = get();
//     if (!allTickets.length) return;

//     let selectedData = [];

    
//     if (group === 'status') {
//       const statusMap = allTickets.reduce((acc, ticket) => {
//         (acc[ticket.status] = acc[ticket.status] || []).push(ticket);
//         return acc;
//       }, {});
//       selectedData = Object.entries(statusMap).map(([title, value]) => ({ title, value }));
//     } else if (group === 'user') {
//       const userMap = allTickets.reduce((acc, ticket) => {
//         const user = allUsers.find(u => u.id === ticket.userId);
//         if (user) {
//           (acc[user.name] = acc[user.name] || []).push({
//             ...ticket,
//             available: user.available,
//           });
//         }
//         return acc;
//       }, {});
//       selectedData = Object.entries(userMap).map(([title, value]) => ({ title, value }));
//     } else {
//       const priorList = ["No priority", "Low", "Medium", "High", "Urgent"];
//       selectedData = priorList.map((priority, index) => ({
//         title: priority,
//         value: allTickets.filter((ticket) => ticket.priority === index)
//       }));
//     }

//     if (orderValue === "title") {
//       selectedData.forEach(data => {
//         data.value.sort((a, b) => a.title.localeCompare(b.title));
//       });
//     } else if (orderValue === "priority") {
//       selectedData.forEach(data => {
//         data.value.sort((a, b) => b.priority - a.priority);
//       });
//     }

//     set({ selectedData });
//   },
// }));

// export default useStore;

selectData: (group, orderValue) => {
  const { allTickets, allUsers } = get();
  if (!allTickets.length) return;

  let selectedData = [];

  if (group === 'status') {
    const statusList = ['Todo', 'In progress', 'Done', 'Backlog', 'Cancelled'];
    const statusMap = statusList.reduce((acc, status) => {
      acc[status] = []; 
      return acc;
    }, {});

  
    allTickets.forEach((ticket) => {
      if (statusMap[ticket.status]) {
        statusMap[ticket.status].push(ticket);
      }
    });

    // Convert statusMap to selectedData format
    selectedData = statusList.map(status => ({
      title: status,
      value: statusMap[status]
    }));

  } else if (group === 'user') {
    const userMap = allTickets.reduce((acc, ticket) => {
      const user = allUsers.find(u => u.id === ticket.userId);
      if (user) {
        (acc[user.name] = acc[user.name] || []).push({
          ...ticket,
          available: user.available, // Include the user's availability
        });
      }
      return acc;
    }, {});
    selectedData = Object.entries(userMap).map(([title, value]) => ({ title, value }));
  } else {
    const priorList = ["No priority", "Low", "Medium", "High", "Urgent"];
    selectedData = priorList.map((priority, index) => ({
      title: priority,
      value: allTickets.filter((ticket) => ticket.priority === index)
    }));
  }

  if (orderValue === "title") {
    selectedData.forEach(data => {
      data.value.sort((a, b) => a.title.localeCompare(b.title));
    });
  } else if (orderValue === "priority") {
    selectedData.forEach(data => {
      data.value.sort((a, b) => b.priority - a.priority);
    });
  }

  set({ selectedData });
},
}));

export default useStore;
