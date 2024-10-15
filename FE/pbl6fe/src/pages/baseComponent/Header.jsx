
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useAuth } from '../auth/AuthContext';

const Header = () => {
    const { logout } = useAuth();
    const navigate = useNavigate();
    const handleLogout = () => {
        logout(); 
        navigate('/login');
        Swal.fire({
            icon: 'success',
            title: 'Đăng xuất thành công!',
            showConfirmButton: false,
            timer: 15000
        });
  };
    return (
        <>
            <header id="header_part" class="fullwidth">
                <div id="header">
                    <div class="container">
                        <div class="utf_left_side">
                            <div id="logo"> <a href="index_1.html"><img src="images/logo.png" alt=""/></a> </div>
                            <div class="mmenu-trigger">
                                <button class="hamburger utfbutton_collapse" type="button">
                                    <span class="utf_inner_button_box">
                                        <span class="utf_inner_section"></span>
                                    </span>
                                </button>
                            </div>
                            <nav id="navigation" class="style_one">
                                <ul id="responsive">
                                    <li><a class="current" href="#">Home</a>
                                        <ul>
                                            <li><a href="index_1.html">Home Version 1</a></li>
                                            <li><a href="index_2.html">Home Version 2</a></li>
                                            <li><a href="index_3.html">Home Version 3</a></li>
                                            <li><a class="active" href="index_4.html">Home Version 4</a></li>
                                            <li><a href="index_5.html">Home Version 5</a></li>
                                            <li><a href="index_6.html">Home Version 6</a></li>
                                            <li><a href="index_7.html">Home Version 7</a></li>
                                        </ul>
                                    </li>
                                    <li><a href="#">Listings</a>
                                        <ul>
                                            <li><a href="#">List Layout</a>
                                                <ul>
                                                    <li><a href="listings_list_with_sidebar.html">Listing List Sidebar</a></li>
                                                    <li><a href="listings_list_full_width.html">Listing List Full Width</a></li>
                                                </ul>
                                            </li>
                                            <li><a href="#">Grid Layout</a>
                                                <ul>
                                                    <li><a href="listings_grid_with_sidebar.html">Listing Grid Sidebar</a></li>
                                                    <li><a href="listings_two_column_map_grid.html">Listing Two Column Grid</a></li>
                                                    <li><a href="listings_grid_full_width.html">Listing Grid Full Width</a></li>
                                                </ul>
                                            </li>
                                            <li><a href="#">Half Listing Map</a>
                                                <ul>
                                                    <li><a href="listings_half_screen_map_list.html">Listing Half List</a></li>
                                                    <li><a href="listings_half_screen_map_grid.html">Listing Half Grid</a></li>
                                                </ul>
                                            </li>
                                            <li><a href="#">Listing Details</a>
                                                <ul>
                                                    <li><a href="listings_single_page_1.html">Single Listing Version 1</a></li>
                                                    <li><a href="listings_single_page_2.html">Single Listing Version 2</a></li>
                                                    <li><a href="listings_single_page_3.html">Single Listing Version 3</a></li>
                                                    <li><a href="listings_single_page_4.html">Single Listing Version 4</a></li>
                                                    <li><a href="listings_single_page_5.html">Single Listing Version 5</a></li>
                                                </ul>
                                            </li>
                                        </ul>
                                    </li>
                                    <li><a href="#">User Panel</a>
                                        <ul>
                                            <li><a href="dashboard.html">Dashboard</a></li>
                                            <li><a href="dashboard_add_listing.html">Add Listing</a></li>
                                            <li><a href="dashboard_my_listing.html">My Listings</a></li>
                                            <li><a href="dashboard_bookings.html">Bookings</a></li>
                                            <li><a href="dashboard_messages.html">Messages</a></li>
                                            <li><a href="dashboard_wallet.html">Wallet</a></li>
                                            <li><a href="dashboard_visitor_review.html">Reviews</a></li>
                                            <li><a href="dashboard_bookmark.html">Bookmark</a></li>
                                            <li><a href="dashboard_my_profile.html">My Profile</a></li>
                                            <li><a href="dashboard_change_password.html">Change Password</a></li>
                                            <li><a href="dashboard_invoice.html">Invoice</a></li>
                                        </ul>
                                    </li>
                                    <li><a href="#">Blog</a>
                                        <ul>
                                            <li><a href="blog_page.html">Blog Grid</a></li>
                                            <li><a href="blog_page_left_sidebar.html">Blog Left Sidebar</a></li>
                                            <li><a href="blog_page_right_sidebar.html">Blog Right Sidebar</a></li>
                                            <li><a href="blog_detail_left_sidebar.html">Blog Detail Leftside</a></li>
                                            <li><a href="blog_detail_right_sidebar.html">Blog Detail Rightside</a></li>
                                        </ul>
                                    </li>
                                    <li><a href="#">Pages</a>
                                        <ul>
                                            <li><a href="page_about.html">About Us</a></li>
                                            <li><a href="#">Categorie Type</a>
                                                <ul>
                                                    <li><a href="page_categorie_one.html">Categorie One</a></li>
                                                    <li><a href="page_categorie_two.html">Categorie Two</a></li>
                                                </ul>
                                            </li>
                                            <li><a href="add_listing.html">Add Listing</a></li>
                                            <li><a href="listing_booking.html">Booking Listing</a></li>
                                            <li><a href="page_pricing.html">Pricing Plan</a></li>
                                            <li><a href="wishlist_listings.html">Wishlist Page</a></li>
                                            <li><a href="page_filtering_style.html">Filtering Style</a></li>
                                            <li><a href="typography.html">Typography</a></li>
                                            <li><a href="page_element.html">Page Element</a></li>
                                            <li><a href="page_faqs.html">Page Faq</a></li>
                                            <li><a href="#">Icons</a>
                                                <ul>
                                                    <li><a href="page_icons_one.html">Icon-Mind Icon</a></li>
                                                    <li><a href="page_icons_two.html">Simple Line Icon</a></li>
                                                    <li><a href="page_icons_three.html">Font Awesome Icon</a></li>
                                                </ul>
                                            </li>
                                            <li><a href="page_not_found.html">Page Error 404</a></li>
                                            <li><a href="page_coming_soon.html">Coming Soon</a></li>
                                            <li><a href="contact.html">Contact</a></li>
                                        </ul>
                                    </li>
                                </ul>
                            </nav>
                            <div class="clearfix"></div>
                        </div>
                        <div class="utf_right_side">
                            <div class="header_widget"> <a href="#dialog_signin_part" class="button border sign-in popup-with-zoom-anim"><i class="fa fa-th"></i> Dashboard</a> <a href="" class="button border with-icon" onClick={handleLogout}><i class="fa fa-sign-out"></i> Logout</a></div>
                        </div>
                    </div>
                </div>
            </header>
        </>
    )
}

export default Header 