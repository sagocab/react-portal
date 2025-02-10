// import { createRouteConfig } from '@tanstack/router'
// import { BoardManage } from '@/components/BoardWrite'
// import { BoardList } from './components/BoardList'
// import { Sidebar } from '@/components/Sidebar'

// const rootRoute = createRouteConfig()

// const boardWriteRoute = rootRoute.createRoute({
//   path: '/write',
//   component: BoardManage,
// })

// const boardListRoute = rootRoute.createRoute({
//   path: '/list',
//   component: BoardList,
// })

// const router = createRouter({
//   routeConfig: rootRoute.addChildren([boardWriteRoute, boardListRoute]),
// })

// function App() {
//   return (
//     <RouterProvider router={router}>
//       <div className="flex">
//         <Sidebar />
//         <div className="flex-1 p-4">
//           <router.RouteComponent />
//         </div>
//       </div>
//     </RouterProvider>
//   )
// }

// export default App