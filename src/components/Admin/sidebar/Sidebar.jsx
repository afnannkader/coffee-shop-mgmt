import { Link, useNavigate } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import { useDispatch, useSelector } from 'react-redux';
import './Sidebar.css';
import { useSnackbar } from 'notistack';
// import { logoutUser } from '../../../actions/userAction';

const navMenu = [
    {
     
        label: "Dashboard",
        ref: "/admin/dashboard",
    },
    {
      
        label: "Orders",
        ref: "/admin/vieworder",
    },
    {
    
        label: "Products",
        ref: "/admin/viewproduct",
    },
    {
        
        label: "Add Product",
        ref: "/admin/addproduct",
    },
    {
      
        label: "",
        ref: "/admin/users",
    },
    {
        
        label: "",
        ref: "/admin/reviews",
    },
    {
        
        label: "",
        ref: "#",
    },
    {
        
        label: "",
        ref: "#",
    },
    {
        
        label: "",
        ref: "#",
    },
    {
        
        label: "",
        ref: "#",
    },
    

   
   
];

const Sidebar = ({ activeTab, setToggleSidebar }) => {
console.log(setToggleSidebar)
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();

    const { user } = useSelector((state) => state.user);

    // const handleLogout = () => {
    //     dispatch(logoutUser());
    //     enqueueSnackbar("Logout Successfully", { variant: "success" });
    //     navigate("/login");
    // }

    return (
        <aside className="sidebar z-10 sm:z-0 block min-h-screen fixed left-0  bg-white text-black border-r">
            <div className="flex items-center gap-3 bg-white p-2 rounded-lg shadow-lg my-4 mx-3.5">
                <Avatar
                    alt="Avatar"
                  
                />
                <div className="flex flex-col gap-0">
                    <span className="font-medium text-lg">{user.name}</span>
                    <span className="text-black-300 text-sm">{user.email}</span>
                </div>
                {/* <button onClick={()=>setToggleSidebar(false)} className="sm:hidden bg-white-800 ml-auto rounded-full w-10 h-10 flex items-center justify-center">
                    {"Close"}
                </button> */}
            </div>

            <div className="flex flex-col w-full gap-0 my-8">
                {navMenu.map((item, index) => {
                    const { icon, label, ref } = item;
                    return (
                        // <React.Fragment key={index}>
                        <>
                            {label === "Logout" ? (
                                <button  className="hover:bg-white-700 flex gap-3 items-center py-3 px-4 font-medium">
                                    <span>{icon}</span>
                                    <span>{label}</span>
                                </button>
                            ) : (
                                <Link to={ref} className={`${activeTab === index ? "bg-white-700" : "hover:bg-gray-100"} flex gap-3 items-center py-3 px-4 font-medium`}>
                                    <span>{icon}</span>
                                    <span>{label}</span>
                                </Link>
                            )}
                            </>
                        // </React.Fragment>
                    )
                }
                )}
            </div>
        </aside>
    )
};

export default Sidebar;
