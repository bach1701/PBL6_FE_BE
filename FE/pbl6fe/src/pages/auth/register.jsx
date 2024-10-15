import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState(''); 
  const [full_name, setFull_name] = useState('');
  const [phone, setPhone] = useState('');
  const [username, setUsername] = useState('');
  const [message, setMessage] = useState('');

  const fetchCsrfToken = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/');
      const cookies = response.headers['set-cookie'];
      const csrfTokenMatch = cookies ? cookies.match(/csrftoken=([^;]+)/) : null;

      return csrfTokenMatch ? csrfTokenMatch[1] : null;
    } catch (error) {
      console.error('Error fetching CSRF token:', error);
      return null;
    }
  };

  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate('/login'); 
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setMessage('Passwords do not match');
      return;
    }

    const csrfToken = await fetchCsrfToken();

    try {
      const response = await axios.post(
        'http://127.0.0.1:8000/user/api/userauths/register/',
        {
          email,
          password,
          full_name,
          phone,
          username,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': csrfToken || '',
          },
        }
      );

      if (response.status === 201) {
        setMessage('Register successful! Please log in to use our service!');
        console.log('Register successful:', response.data);
        Swal.fire({
            icon: 'success',
            title: 'Đăng ký thành công!',
            text: 'Vui lòng đăng nhập vào hệ thống.',
            showConfirmButton: false,
            timer: 1500
        });
      }
    } catch (error) {
      setMessage('Register failed');
      console.error('Register failed:', error.response.data);
      Swal.fire({
        icon: 'error',
        title: 'Đăng ký thất bại!',
        text: 'Vui lòng kiểm tra lại.',
        showConfirmButton: false,
        timer: 1500
    });
    }
  };

        return (
            <div id="main_wrapper">
                <header id="header_part" className="fullwidth">
                    <div id="header">
                        <div className="container">
                            <div className="utf_left_side">
                                <div id="logo"> <a href="index_1.html"><img src="images/logo.png" alt=""/></a> </div>
                                <div className="mmenu-trigger">
                                    <button className="hamburger utfbutton_collapse" type="button">
                        <span className="utf_inner_button_box">
                            <span className="utf_inner_section"></span>
                        </span>
                    </button>
                                </div>
                                <nav id="navigation" className="style_one">
                                    <ul id="responsive">
                                        <li><a className="current" href="#">Home</a>
                                            <ul>
                                                <li><a href="index_1.html">Home Version 1</a></li>
                                                <li><a href="index_2.html">Home Version 2</a></li>
                                                <li><a href="index_3.html">Home Version 3</a></li>
                                                <li><a className="active" href="index_4.html">Home Version 4</a></li>
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
                                <div className="clearfix"></div>
                            </div>
                            <div className="utf_right_side">
                                <div className="header_widget"> <a href="" className="button border sign-in popup-with-zoom-anim" onClick={handleLoginClick}><i className="fa fa-sign-in"></i> Log In</a> <a href="dashboard_add_listing.html" className="button border with-icon"><i className="sl sl-icon-user"></i> Add Listing</a></div>
                            </div>
                        </div>
                    </div>
                </header>
                <div className="clearfix"></div>

                <div className="fullwidth_block search_categorie_block">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12">
                                <h3 className="headline_part centered margin-top-75 margin-bottom-45">Register <span>Hi there! Welcome to ...</span> </h3>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-12">
                        <div className="container">
                            <div className="row">
                                <div className="col-md-6 col-sm-6 col-xs-12">
                                    <div className="category_container_item_part card">
                                        <div className="utf_signin_form style_one">
                                            <ul className="utf_tabs_nav">
                                            </ul>
                                            <div className="tab_container alt">
                                                <div className="tab_content" id="tab2" style={{display: 'block'}}>
                                                    <form method="post" className="register" onSubmit={handleSignup}>
                                                        <p className="utf_row_form utf_form_wide_block">
                                                            <label htmlFor="username2">
                                                                <input type="text" className="input-text" name="username" id="username2" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" />
                                                            </label>
                                                        </p>
                                                        <p className="utf_row_form utf_form_wide_block">
                                                            <label htmlFor="phone2">
                                                                <input type="text" className="input-text" name="email" id="phone2" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Phone" />
                                                            </label>
                                                        </p>
                                                        <p className="utf_row_form utf_form_wide_block">
                                                            <label htmlFor="fullname2">
                                                                <input type="text" className="input-text" name="email" id="fullname2" value={full_name} onChange={(e) => setFull_name(e.target.value)} placeholder="Full Name" />
                                                            </label>
                                                        </p>
                                                        <p className="utf_row_form utf_form_wide_block">
                                                            <label htmlFor="email2">
                                                                <input type="text" className="input-text" name="email" id="email2" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
                                                            </label>
                                                        </p>
                                                        <p className="utf_row_form utf_form_wide_block">
                                                            <label htmlFor="password1">
                                                                <input className="input-text" type="password" name="password1" id="password1" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
                                                            </label>
                                                        </p>
                                                        <p className="utf_row_form utf_form_wide_block">
                                                            <label htmlFor="password2">
                                                                <input
                                                                className="input-text"
                                                                type="password"
                                                                name="password2"
                                                                id="password2"
                                                                value={confirmPassword} // Đặt giá trị cho Confirm Password
                                                                onChange={(e) => setConfirmPassword(e.target.value)} // Cập nhật giá trị Confirm Password
                                                                placeholder="Confirm Password"
                                                                />
                                                            </label>
                                                        </p>
                                                        <input type="submit" className="button border fw margin-top-10" name="register" value="Register" />
                                                    </form>
                                                    {message && <p>{message}</p>} 
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-md-6 col-sm-6 col-xs-12">
                                    <div className="category_container_item_part">
                                        <a href="#" className="category_item_box"> 
                                            <img src="images/category-box-02.jpg" style={{width: '100%', height: '420px'}} alt=""/>
                                            <div className="category_content_box_part">
                                                <h3>Sign In Now</h3>
                                                <span>To enjoy more features</span> 
                                            </div>
                                        </a>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
                <div className="clearfix"></div>

                <section className="fullwidth_block margin-top-65 padding-top-75 padding-bottom-70" data-background-color="#f9f9f9">
                    <div className="container">
                        <div className="row slick_carousel_slider">
                            <div className="col-md-12">
                                <h3 className="headline_part centered margin-bottom-45">Our Popular Tours <span>Explore the greates places in the city</span> </h3>
                            </div>

                            <div className="row">
                                <div className="col-md-12">
                                    <div className="simple_slick_carousel_block utf_dots_nav">
                                        <div className="utf_carousel_item">
                                            <a href="listings_single_page_1.html" className="utf_listing_item-container compact">
                                                <div className="utf_listing_item"> <img src="images/utf_listing_item-01.jpg" alt=""/> <span className="tag"><i className="im im-icon-Chef-Hat"></i> Restaurant</span> <span className="featured_tag">Featured</span>
                                                    <span className="utf_open_now">Open Now</span>
                                                    <div className="utf_listing_item_content">
                                                        <div className="utf_listing_prige_block">
                                                            <span className="utf_meta_listing_price"><i className="fa fa-tag"></i> $25 - $55</span>
                                                            <span className="utp_approve_item"><i className="utf_approve_listing"></i></span>
                                                        </div>
                                                        <h3>Chontaduro Barcelona</h3>
                                                        <span><i className="fa fa-map-marker"></i> The Ritz-Carlton, Hong Kong</span>
                                                        <span><i className="fa fa-phone"></i> (+15) 124-796-3633</span>
                                                    </div>
                                                </div>
                                                <div className="utf_star_rating_section" data-rating="4.5">
                                                    <div className="utf_counter_star_rating">(4.5)</div>
                                                    <span className="utf_view_count"><i className="fa fa-eye"></i> 822+</span>
                                                    <span className="like-icon"></span>
                                                </div>
                                            </a>
                                        </div>

                                        <div className="utf_carousel_item">
                                            <a href="listings_single_page_1.html" className="utf_listing_item-container compact">
                                                <div className="utf_listing_item"> <img src="images/utf_listing_item-02.jpg" alt=""/> <span className="tag"><i className="im im-icon-Electric-Guitar"></i> Events</span>
                                                    <div className="utf_listing_item_content">
                                                        <div className="utf_listing_prige_block">
                                                            <span className="utf_meta_listing_price"><i className="fa fa-tag"></i> $45 - $70</span>
                                                        </div>
                                                        <h3>The Lounge & Bar</h3>
                                                        <span><i className="fa fa-map-marker"></i> The Ritz-Carlton, Hong Kong</span>
                                                        <span><i className="fa fa-phone"></i> (+15) 124-796-3633</span>
                                                    </div>
                                                </div>
                                                <div className="utf_star_rating_section" data-rating="4.5">
                                                    <div className="utf_counter_star_rating">(4.5)</div>
                                                    <span className="utf_view_count"><i className="fa fa-eye"></i> 822+</span>
                                                    <span className="like-icon"></span>
                                                </div>
                                            </a>
                                        </div>

                                        <div className="utf_carousel_item">
                                            <a href="listings_single_page_1.html" className="utf_listing_item-container compact">
                                                <div className="utf_listing_item"> <img src="images/utf_listing_item-03.jpg" alt=""/> <span className="tag"><i className="im im-icon-Hotel"></i> Hotels</span>
                                                    <span className="utf_closed">Closed</span>
                                                    <div className="utf_listing_item_content">
                                                        <div className="utf_listing_prige_block">
                                                            <span className="utf_meta_listing_price"><i className="fa fa-tag"></i> $25 - $55</span>
                                                        </div>
                                                        <h3>Westfield Sydney</h3>
                                                        <span><i className="fa fa-map-marker"></i> The Ritz-Carlton, Hong Kong</span>
                                                        <span><i className="fa fa-phone"></i> (+15) 124-796-3633</span>
                                                    </div>
                                                </div>
                                                <div className="utf_star_rating_section" data-rating="4.5">
                                                    <div className="utf_counter_star_rating">(4.5)</div>
                                                    <span className="utf_view_count"><i className="fa fa-eye"></i> 822+</span>
                                                    <span className="like-icon"></span>
                                                </div>
                                            </a>
                                        </div>

                                        <div className="utf_carousel_item">
                                            <a href="listings_single_page_1.html" className="utf_listing_item-container compact">
                                                <div className="utf_listing_item"> <img src="images/utf_listing_item-04.jpg" alt=""/> <span className="tag"><i className="im im-icon-Dumbbell"></i> Fitness</span>
                                                    <div className="utf_listing_item_content">
                                                        <div className="utf_listing_prige_block">
                                                            <span className="utf_meta_listing_price"><i className="fa fa-tag"></i> $45 - $70</span>
                                                            <span className="utp_approve_item"><i className="utf_approve_listing"></i></span>
                                                        </div>
                                                        <h3>Ruby Beauty Center</h3>
                                                        <span><i className="fa fa-map-marker"></i> The Ritz-Carlton, Hong Kong</span>
                                                        <span><i className="fa fa-phone"></i> (+15) 124-796-3633</span>
                                                    </div>
                                                </div>
                                                <div className="utf_star_rating_section" data-rating="4.5">
                                                    <div className="utf_counter_star_rating">(4.5)</div>
                                                    <span className="utf_view_count"><i className="fa fa-eye"></i> 822+</span>
                                                    <span className="like-icon"></span>
                                                </div>
                                            </a>
                                        </div>

                                        <div className="utf_carousel_item">
                                            <a href="listings_single_page_1.html" className="utf_listing_item-container compact">
                                                <div className="utf_listing_item"> <img src="images/utf_listing_item-05.jpg" alt=""/> <span className="tag"><i className="im im-icon-Hotel"></i> Hotels</span> <span className="featured_tag">Featured</span>
                                                    <span className="utf_closed">Closed</span>
                                                    <div className="utf_listing_item_content">
                                                        <div className="utf_listing_prige_block">
                                                            <span className="utf_meta_listing_price"><i className="fa fa-tag"></i> $45 - $70</span>
                                                        </div>
                                                        <h3>UK Fitness Club</h3>
                                                        <span><i className="fa fa-map-marker"></i> The Ritz-Carlton, Hong Kong</span>
                                                        <span><i className="fa fa-phone"></i> (+15) 124-796-3633</span>
                                                    </div>
                                                </div>
                                                <div className="utf_star_rating_section" data-rating="4.5">
                                                    <div className="utf_counter_star_rating">(4.5)</div>
                                                    <span className="utf_view_count"><i className="fa fa-eye"></i> 822+</span>
                                                    <span className="like-icon"></span>
                                                </div>
                                            </a>
                                        </div>

                                        <div className="utf_carousel_item">
                                            <a href="listings_single_page_1.html" className="utf_listing_item-container compact">
                                                <div className="utf_listing_item"> <img src="images/utf_listing_item-06.jpg" alt=""/> <span className="tag"><i className="im im-icon-Chef-Hat"></i> Restaurant</span>
                                                    <span className="utf_open_now">Open Now</span>
                                                    <div className="utf_listing_item_content">
                                                        <div className="utf_listing_prige_block">
                                                            <span className="utf_meta_listing_price"><i className="fa fa-tag"></i> $25 - $45</span>
                                                            <span className="utp_approve_item"><i className="utf_approve_listing"></i></span>
                                                        </div>
                                                        <h3>Fairmont Pacific Rim</h3>
                                                        <span><i className="fa fa-map-marker"></i> The Ritz-Carlton, Hong Kong</span>
                                                        <span><i className="fa fa-phone"></i> (+15) 124-796-3633</span>
                                                    </div>
                                                </div>
                                                <div className="utf_star_rating_section" data-rating="4.5">
                                                    <div className="utf_counter_star_rating">(4.5)</div>
                                                    <span className="utf_view_count"><i className="fa fa-eye"></i> 822+</span>
                                                    <span className="like-icon"></span>
                                                </div>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="fullwidth_block padding-bottom-75">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-8 col-md-offset-2">
                                <h2 className="headline_part centered margin-top-80">How It Works? <span className="margin-top-10">Discover & connect with great local businesses</span> </h2>
                            </div>
                        </div>
                        <div className="row container_icon">
                            <div className="col-md-4 col-sm-4 col-xs-12">
                                <div className="box_icon_two box_icon_with_line"> <i className="im im-icon-Map-Marker2"></i>
                                    <h3>Find Interesting Place</h3>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas in pulvinar neque Nulla finibus.</p>
                                </div>
                            </div>

                            <div className="col-md-4 col-sm-4 col-xs-12">
                                <div className="box_icon_two box_icon_with_line"> <i className="im im-icon-Mail-Add"></i>
                                    <h3>Contact a Few Owners</h3>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas in pulvinar neque Nulla finibus.</p>
                                </div>
                            </div>

                            <div className="col-md-4 col-sm-4 col-xs-12">
                                <div className="box_icon_two"> <i className="im im-icon-Administrator"></i>
                                    <h3>Make a Reservation</h3>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas in pulvinar neque Nulla finibus.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="utf_testimonial_part fullwidth_block padding-top-75 padding-bottom-75">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-8 col-md-offset-2">
                                <h3 className="headline_part centered"> What Say Our Customers <span className="margin-top-15">Lorem Ipsum is simply dummy text of the printing and type setting industry. Lorem Ipsum has been the industry's standard dummy text ever since...</span> </h3>
                            </div>
                        </div>
                    </div>
                    <div className="fullwidth_carousel_container_block margin-top-20">
                        <div className="utf_testimonial_carousel testimonials">
                            <div className="utf_carousel_review_part">
                                <div className="utf_testimonial_box">
                                    <div className="testimonial">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas in pulvinar neque. Nulla finibus lobortis pulvinar. Donec a consectetur nulla. Nulla posuere sapien vitae lectus suscipit, et pulvinar nisi tincidunt. Aliquam
                                        erat volutpat. Curabitur convallis fringilla diam sed aliquam. Sed tempor iaculis massa faucibus feugiat. In fermentum facilisis massa, a consequat purus viverra.</div>
                                </div>
                                <div className="utf_testimonial_author"> <img src="images/happy-client-01.jpg" alt=""/>
                                    <h4>Denwen Evil <span>Web Developer</span></h4>
                                </div>
                            </div>
                            <div className="utf_carousel_review_part">
                                <div className="utf_testimonial_box">
                                    <div className="testimonial">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas in pulvinar neque. Nulla finibus lobortis pulvinar. Donec a consectetur nulla. Nulla posuere sapien vitae lectus suscipit, et pulvinar nisi tincidunt. Aliquam
                                        erat volutpat. Curabitur convallis fringilla diam sed aliquam. Sed tempor iaculis massa faucibus feugiat. In fermentum facilisis massa, a consequat purus viverra.</div>
                                </div>
                                <div className="utf_testimonial_author"> <img src="images/happy-client-02.jpg" alt=""/>
                                    <h4>Adam Alloriam <span>Web Developer</span></h4>
                                </div>
                            </div>
                            <div className="utf_carousel_review_part">
                                <div className="utf_testimonial_box">
                                    <div className="testimonial">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas in pulvinar neque. Nulla finibus lobortis pulvinar. Donec a consectetur nulla. Nulla posuere sapien vitae lectus suscipit, et pulvinar nisi tincidunt. Aliquam
                                        erat volutpat. Curabitur convallis fringilla diam sed aliquam. Sed tempor iaculis massa faucibus feugiat. In fermentum facilisis massa, a consequat purus viverra.</div>
                                </div>
                                <div className="utf_testimonial_author"> <img src="images/happy-client-03.jpg" alt=""/>
                                    <h4>Illa Millia <span>Project Manager</span></h4>
                                </div>
                            </div>
                            <div className="utf_carousel_review_part">
                                <div className="utf_testimonial_box">
                                    <div className="testimonial">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas in pulvinar neque. Nulla finibus lobortis pulvinar. Donec a consectetur nulla. Nulla posuere sapien vitae lectus suscipit, et pulvinar nisi tincidunt. Aliquam
                                        erat volutpat. Curabitur convallis fringilla diam sed aliquam. Sed tempor iaculis massa faucibus feugiat. In fermentum facilisis massa, a consequat purus viverra.</div>
                                </div>
                                <div className="utf_testimonial_author"> <img src="images/happy-client-01.jpg" alt=""/>
                                    <h4>Denwen Evil <span>Web Developer</span></h4>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="fullwidth_block padding-top-75 padding-bottom-75" data-background-color="#ffffff">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12">
                                <h3 className="headline_part centered margin-bottom-50"> Letest Tips & Blog<span>Discover & connect with top-rated local businesses</span></h3>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-3 col-sm-6 col-xs-12">
                                <a href="blog_detail_left_sidebar.html" className="blog_compact_part-container">
                                    <div className="blog_compact_part"> <img src="images/blog-compact-post-01.jpg" alt=""/>
                                        <div className="blog_compact_part_content">
                                            <h3>The Most Popular New top Places Listing</h3>
                                            <ul className="blog_post_tag_part">
                                                <li>22 January 2022</li>
                                            </ul>
                                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor</p>
                                        </div>
                                    </div>
                                </a>
                            </div>

                            <div className="col-md-3 col-sm-6 col-xs-12">
                                <a href="blog_detail_left_sidebar.html" className="blog_compact_part-container">
                                    <div className="blog_compact_part"> <img src="images/blog-compact-post-02.jpg" alt=""/>
                                        <div className="blog_compact_part_content">
                                            <h3>Greatest Event Places in Listing</h3>
                                            <ul className="blog_post_tag_part">
                                                <li>18 January 2022</li>
                                            </ul>
                                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor</p>
                                        </div>
                                    </div>
                                </a>
                            </div>

                            <div className="col-md-3 col-sm-6 col-xs-12">
                                <a href="blog_detail_left_sidebar.html" className="blog_compact_part-container">
                                    <div className="blog_compact_part"> <img src="images/blog-compact-post-03.jpg" alt=""/>
                                        <div className="blog_compact_part_content">
                                            <h3>Top 15 Greatest Ideas for Health & Body</h3>
                                            <ul className="blog_post_tag_part">
                                                <li>10 January 2022</li>
                                            </ul>
                                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor</p>
                                        </div>
                                    </div>
                                </a>
                            </div>

                            <div className="col-md-3 col-sm-6 col-xs-12">
                                <a href="blog_detail_left_sidebar.html" className="blog_compact_part-container">
                                    <div className="blog_compact_part"> <img src="images/blog-compact-post-04.jpg" alt=""/>
                                        <div className="blog_compact_part_content">
                                            <h3>Top 10 Best Clothing Shops in Sydney</h3>
                                            <ul className="blog_post_tag_part">
                                                <li>18 January 2022</li>
                                            </ul>
                                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor</p>
                                        </div>
                                    </div>
                                </a>
                            </div>
                            <div className="col-md-12 centered_content"> <a href="blog_page.html" className="button border margin-top-20">View More Blog</a> </div>
                        </div>
                    </div>
                </section>

                <section className="fullwidth_block margin-bottom-0 padding-top-50 padding-bottom-50" data-background-color="linear-gradient(to bottom, #f9f9f9 0%, rgba(255, 255, 255, 1))">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12">
                                <div className="companie-logo-slick-carousel utf_dots_nav">
                                    <div className="item">
                                        <img src="images/brand_logo_01.png" alt=""/>
                                    </div>
                                    <div className="item">
                                        <img src="images/brand_logo_02.png" alt=""/>
                                    </div>
                                    <div className="item">
                                        <img src="images/brand_logo_03.png" alt=""/>
                                    </div>
                                    <div className="item">
                                        <img src="images/brand_logo_04.png" alt=""/>
                                    </div>
                                    <div className="item">
                                        <img src="images/brand_logo_05.png" alt=""/>
                                    </div>
                                    <div className="item">
                                        <img src="images/brand_logo_06.png" alt=""/>
                                    </div>
                                    <div className="item">
                                        <img src="images/brand_logo_07.png" alt=""/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="utf_cta_area_item utf_cta_area2_block">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12">
                                <div className="utf_subscribe_block clearfix">
                                    <div className="col-md-8 col-sm-7">
                                        <div className="section-heading">
                                            <h2 className="utf_sec_title_item utf_sec_title_item2">Subscribe to Newsletter!</h2>
                                            <p className="utf_sec_meta">
                                                Subscribe to get latest updates and information.
                                            </p>
                                        </div>
                                    </div>
                                    <div className="col-md-4 col-sm-5">
                                        <div className="contact-form-action">
                                            <form method="post">
                                                <span className="la la-envelope-o"></span>
                                                <input className="form-control" type="email" placeholder="Enter your email" required=""/>
                                                <button className="utf_theme_btn" type="submit">Subscribe</button>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <div id="footer" className="footer_sticky_part">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-4 col-sm-12 col-xs-12">
                                <h4>About Us</h4>
                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore</p>
                            </div>
                            <div className="col-md-2 col-sm-3 col-xs-6">
                                <h4>Useful Links</h4>
                                <ul className="social_footer_link">
                                    <li><a href="#">Home</a></li>
                                    <li><a href="#">Listing</a></li>
                                    <li><a href="#">Blog</a></li>
                                    <li><a href="#">Privacy Policy</a></li>
                                    <li><a href="#">Contact</a></li>
                                </ul>
                            </div>
                            <div className="col-md-2 col-sm-3 col-xs-6">
                                <h4>My Account</h4>
                                <ul className="social_footer_link">
                                    <li><a href="#">Dashboard</a></li>
                                    <li><a href="#">Profile</a></li>
                                    <li><a href="#">My Listing</a></li>
                                    <li><a href="#">Favorites</a></li>
                                </ul>
                            </div>
                            <div className="col-md-2 col-sm-3 col-xs-6">
                                <h4>Pages</h4>
                                <ul className="social_footer_link">
                                    <li><a href="#">Blog</a></li>
                                    <li><a href="#">Our Partners</a></li>
                                    <li><a href="#">How It Work</a></li>
                                    <li><a href="#">Privacy Policy</a></li>
                                </ul>
                            </div>
                            <div className="col-md-2 col-sm-3 col-xs-6">
                                <h4>Help</h4>
                                <ul className="social_footer_link">
                                    <li><a href="#">Sign In</a></li>
                                    <li><a href="#">Register</a></li>
                                    <li><a href="#">Add Listing</a></li>
                                    <li><a href="#">Pricing</a></li>
                                    <li><a href="#">Contact Us</a></li>
                                </ul>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-md-12">
                                <div className="footer_copyright_part">Copyright © 2022 All Rights Reserved.</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div id="bottom_backto_top"><a href="#"></a></div>
            </div>
        )
}
export default Register

