import React, {useState, useEffect} from "react"
import { useLocation } from 'react-router-dom';
import axios from "axios"
import Header from "../../baseComponent/Header";

const ListHotel = ()=> {
    const query = new URLSearchParams(useLocation().search);
    const initialHotelName = query.get('name');
    const [hotelNames, setHotelNames] = useState(initialHotelName);
    const [searchTerm, setSearchTerm] = useState(initialHotelName);
    const [hotels, setHotels] = useState([]);
    const [error, setError] = useState([]);
    console.log(initialHotelName);

    const fetchHotels = async(hotelNames) => {
        const token = localStorage.getItem('token');
        const baseURL = 'http://127.0.0.1:8000/api/detail/hotels/';
        let url = baseURL 
        if(hotelNames) {
            url += `?name=${encodeURIComponent(hotelNames)}`;
        }
        try {
            const response = await axios.get(url,{
                headers: {
                    'Authorization': `Bearer + ${token}`
                }
            });
            setHotels(response.data);
        } catch (err) {
            setError(err);
        }
    }

        useEffect(() => {       
                fetchHotels(hotelNames);
        },[hotelNames]);
        
        const handleUpdateNameHotel = () => {
            setHotelNames(searchTerm);
        }

    return (
        <>
            {/* <div class="preloader">
                <div class="utf-preloader">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div> */}
            <div id="main_wrapper">
                <Header />
                <div class="clearfix"></div>
                <div id="titlebar" class="gradient">
                    <div class="container">
                        <div class="row">
                            <div class="col-md-12">
                                <h2>Layout List With Sidebar</h2>
                                <nav id="breadcrumbs">
                                    <ul>
                                        <li><a href="index_1.html">Home</a></li>
                                        <li>Layout List With Sidebar</li>
                                    </ul>
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="container">
                    <div class="row">
                        <div class="col-lg-8 col-md-8">
                            <div class="listing_filter_block">
                                <div class="col-md-2 col-xs-2">
                                    <div class="utf_layout_nav"> <a href="listings_grid_with_sidebar.html" class="grid"><i class="fa fa-th"></i></a> <a href="#" class="list active"><i class="fa fa-align-justify"></i></a> </div>
                                </div>
                                <div class="col-md-10 col-xs-10">
                                    <div class="sort-by utf_panel_dropdown sort_by_margin float-right"> <a href="#">Destination</a>
                                        <div class="utf_panel_dropdown-content">
                                            <input class="distance-radius" type="range" min="1" max="999" step="1" value="1" data-title="Select Range"/>
                                            <div class="panel-buttons">
                                                <button class="panel-apply">Apply</button>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="sort-by">
                                        <div class="utf_sort_by_select_item sort_by_margin">
                                            <select data-placeholder="Sort by Listing" class="utf_chosen_select_single">
                                                <option>Sort by Listing</option>
                                                <option>Latest Listings</option>
                                                <option>Popular Listings</option>
                                                <option>Price (Low to High)</option>
                                                <option>Price (High to Low)</option>
                                                <option>Highest Reviewe</option>
                                                <option>Lowest Reviewe</option>                  
                                                <option>Newest Listing</option>
                                                <option>Oldest Listing</option>
                                                <option>Random Listings</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="sort-by">
                                        <div class="utf_sort_by_select_item sort_by_margin">
                                            <select data-placeholder="Categories:" class="utf_chosen_select_single">
                                                <option>Categories</option>	
                                                <option>Restaurant</option>
                                                <option>Health</option>
                                                <option>Hotels</option>
                                                <option>Real Estate</option>                  
                                                <option>Fitness</option>                  
                                                <option>Shopping</option>
                                                <option>Travel</option>
                                                <option>Shops</option>
                                                <option>Nightlife</option>
                                                <option>Events</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="sort-by">
                                        <div class="utf_sort_by_select_item utf_search_map_section">
                                            <ul>
                                                <li><a class="utf_common_button" href="#"><i class="fa fa-dot-circle-o"></i>Near Me</a></li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <ul>
                                    {hotels.map(hotel =>(
                                        <li key={hotel.id}>
                                            <div class="col-lg-12 col-md-12">
                                                <div class="utf_listing_item-container list-layout">
                                                    <a href={`http://localhost:3000/detailhotel/${hotel.slug}`} class="utf_listing_item">
                                                        <div class="utf_listing_item-image">
                                                            <img src={hotel.image} alt=""/>
                                                            <span class="like-icon"></span>
                                                            <span class="tag"><i class="im im-icon-Hotel"></i> Hotels</span>
                                                            <div class="utf_listing_prige_block utf_half_list">
                                                                <span class="utf_meta_listing_price"><i class="fa fa-tag"></i> $25 - $45</span>
                                                                <span class="utp_approve_item"><i class="utf_approve_listing"></i></span>
                                                            </div>
                                                        </div>
                                                        <span class="utf_open_now">Open Now</span>
                                                        <div class="utf_listing_item_content">
                                                            <div class="utf_listing_item-inner">
                                                                <h3>{hotel.name}</h3>
                                                                <span><i class="fa fa-map-marker"></i>{hotel.address}</span>
                                                                <span><i class="fa fa-phone"></i>{hotel.mobile}</span>
                                                                <div class="utf_star_rating_section" data-rating="4.5">
                                                                    <div class="utf_counter_star_rating">(4.5)</div>
                                                                </div>
                                                                <p>{hotel.description}</p>
                                                            </div>
                                                        </div>
                                                    </a>
                                                </div>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                                <div class="col-lg-12 col-md-12">
                                    <div class="utf_listing_item-container list-layout">
                                        <a href="listings_single_page_1.html" class="utf_listing_item">
                                            <div class="utf_listing_item-image">
                                                <img src="images/utf_listing_item-05.jpg" alt=""/>
                                                <span class="like-icon"></span>
                                                <span class="tag"><i class="im im-icon-Hotel"></i> Hotels</span>
                                                <div class="utf_listing_prige_block utf_half_list">
                                                    <span class="utf_meta_listing_price"><i class="fa fa-tag"></i> $25 - $45</span>
                                                    <span class="utp_approve_item"><i class="utf_approve_listing"></i></span>
                                                </div>
                                            </div>
                                            <div class="utf_listing_item_content">
                                                <div class="utf_listing_item-inner">
                                                    <h3>UK Fitness Club</h3>
                                                    <span><i class="fa fa-map-marker"></i> The Ritz-Carlton, Hong Kong</span>
                                                    <span><i class="fa fa-phone"></i> (+15) 124-796-3633</span>
                                                    <div class="utf_star_rating_section" data-rating="4.5">
                                                        <div class="utf_counter_star_rating">(4.5)</div>
                                                    </div>
                                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas in pulvinar neque. Nulla finibus lobortis pulvinar. Donec a consectetur nulla.</p>
                                                </div>
                                            </div>
                                        </a>
                                    </div>
                                </div>
                                <div class="col-lg-12 col-md-12">
                                    <div class="utf_listing_item-container list-layout">
                                        <a href="listings_single_page_1.html" class="utf_listing_item">
                                            <div class="utf_listing_item-image">
                                                <img src="images/utf_listing_item-06.jpg" alt=""/>
                                                <span class="like-icon"></span>
                                                <span class="tag"><i class="im im-icon-Hotel"></i> Hotels</span>
                                                <div class="utf_listing_prige_block utf_half_list">
                                                    <span class="utf_meta_listing_price"><i class="fa fa-tag"></i> $25 - $45</span>
                                                    <span class="utp_approve_item"><i class="utf_approve_listing"></i></span>
                                                </div>
                                            </div>
                                            <div class="utf_listing_item_content">
                                                <div class="utf_listing_item-inner">
                                                    <h3>Fairmont Pacific Rim</h3>
                                                    <span><i class="fa fa-map-marker"></i> The Ritz-Carlton, Hong Kong</span>
                                                    <span><i class="fa fa-phone"></i> (+15) 124-796-3633</span>
                                                    <div class="utf_star_rating_section" data-rating="4.5">
                                                        <div class="utf_counter_star_rating">(4.5)</div>
                                                    </div>
                                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas in pulvinar neque. Nulla finibus lobortis pulvinar. Donec a consectetur nulla.</p>
                                                </div>
                                            </div>
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <div class="clearfix"></div>
                            <div class="row">
                                <div class="col-md-12">
                                    <div class="utf_pagination_container_part margin-top-20 margin-bottom-70">
                                        <nav class="pagination">
                                            <ul>
                                                <li><a href="#"><i class="sl sl-icon-arrow-left"></i></a></li>
                                                <li><a href="#" class="current-page">1</a></li>
                                                <li><a href="#">2</a></li>
                                                <li><a href="#">3</a></li>
                                                <li><a href="#">4</a></li>
                                                <li><a href="#"><i class="sl sl-icon-arrow-right"></i></a></li>
                                            </ul>
                                        </nav>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="col-lg-4 col-md-4">
                            <div class="sidebar">
                                <div class="utf_box_widget margin-bottom-35">
                                    <h3><i class="sl sl-icon-direction"></i> Filters</h3>
                                    <div class="row with-forms">
                                        <div class="col-md-12">
                                            <input type="text" placeholder="What are you looking for?" 
                                            value={searchTerm} 
                                            onChange={(e) => setSearchTerm(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                    <div class="row with-forms">
                                        <div class="col-md-12">
                                            <div class="input-with-icon location">
                                                <input type="text" placeholder="Search Location..." value="" />
                                                <a href="#"><i class="sl sl-icon-location"></i></a> </div>
                                        </div>
                                    </div>
                                    <a href="#" class="more-search-options-trigger margin-bottom-10" data-open-title="More Filters Options" data-close-title="More Filters Options"></a>
                                    <div class="more-search-options relative">
                                        <div class="checkboxes one-in-row margin-bottom-15">
                                            <input id="check-a" type="checkbox" name="check"/>
                                            <label for="check-a">Real Estate</label>
                                            <input id="check-b" type="checkbox" name="check"/>
                                            <label for="check-b">Friendly Workspace</label>
                                            <input id="check-c" type="checkbox" name="check"/>
                                            <label for="check-c">Instant Book</label>
                                            <input id="check-d" type="checkbox" name="check"/>
                                            <label for="check-d">Wireless Internet</label>
                                            <input id="check-e" type="checkbox" name="check"/>
                                            <label for="check-e">Free Parking</label>
                                            <input id="check-f" type="checkbox" name="check"/>
                                            <label for="check-f">Elevator in Building</label>
                                            <input id="check-g" type="checkbox" name="check"/>
                                            <label for="check-g">Restaurant</label>
                                            <input id="check-h" type="checkbox" name="check"/>
                                            <label for="check-h">Dance Floor</label>
                                        </div>
                                    </div>
                                    <button class="button fullwidth_block margin-top-5" onClick={handleUpdateNameHotel}>Update</button>
                                </div>
                                <div class="utf_box_widget margin-top-35 margin-bottom-75">
                                    <h3><i class="sl sl-icon-folder-alt"></i> Categories</h3>
                                    <ul class="utf_listing_detail_sidebar">
                                        <li><i class="fa fa-angle-double-right"></i> <a href="#">Travel</a></li>
                                        <li><i class="fa fa-angle-double-right"></i> <a href="#">Nightlife</a></li>
                                        <li><i class="fa fa-angle-double-right"></i> <a href="#">Fitness</a></li>
                                        <li><i class="fa fa-angle-double-right"></i> <a href="#">Real Estate</a></li>
                                        <li><i class="fa fa-angle-double-right"></i> <a href="#">Restaurant</a></li>
                                        <li><i class="fa fa-angle-double-right"></i> <a href="#">Dance Floor</a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <section class="utf_cta_area_item utf_cta_area2_block">
                    <div class="container">
                        <div class="row">
                            <div class="col-md-12">
                                <div class="utf_subscribe_block clearfix">
                                    <div class="col-md-8 col-sm-7">
                                        <div class="section-heading">
                                            <h2 class="utf_sec_title_item utf_sec_title_item2">Subscribe to Newsletter!</h2>
                                            <p class="utf_sec_meta">
                                                Subscribe to get latest updates and information.
                                            </p>
                                        </div>
                                    </div>
                                    <div class="col-md-4 col-sm-5">
                                        <div class="contact-form-action">
                                            <form method="post">
                                                <span class="la la-envelope-o"></span>
                                                <input class="form-control" type="email" placeholder="Enter your email" required=""/>
                                                <button class="utf_theme_btn" type="submit">Subscribe</button>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <div id="footer" class="footer_sticky_part">
                    <div class="container">
                        <div class="row">
                            <div class="col-md-2 col-sm-3 col-xs-6">
                                <h4>Useful Links</h4>
                                <ul class="social_footer_link">
                                    <li><a href="#">Home</a></li>
                                    <li><a href="#">Listing</a></li>
                                    <li><a href="#">Blog</a></li>
                                    <li><a href="#">Privacy Policy</a></li>
                                    <li><a href="#">Contact</a></li>
                                </ul>
                            </div>
                            <div class="col-md-2 col-sm-3 col-xs-6">
                                <h4>My Account</h4>
                                <ul class="social_footer_link">
                                    <li><a href="#">Dashboard</a></li>
                                    <li><a href="#">Profile</a></li>
                                    <li><a href="#">My Listing</a></li>
                                    <li><a href="#">Favorites</a></li>
                                </ul>
                            </div>
                            <div class="col-md-2 col-sm-3 col-xs-6">
                                <h4>Pages</h4>
                                <ul class="social_footer_link">
                                    <li><a href="#">Blog</a></li>
                                    <li><a href="#">Our Partners</a></li>
                                    <li><a href="#">How It Work</a></li>
                                    <li><a href="#">Privacy Policy</a></li>
                                </ul>
                            </div>
                            <div class="col-md-2 col-sm-3 col-xs-6">
                                <h4>Help</h4>
                                <ul class="social_footer_link">
                                    <li><a href="#">Sign In</a></li>
                                    <li><a href="#">Register</a></li>
                                    <li><a href="#">Add Listing</a></li>
                                    <li><a href="#">Pricing</a></li>
                                    <li><a href="#">Contact Us</a></li>
                                </ul>
                            </div>
                            <div class="col-md-4 col-sm-12 col-xs-12">
                                <h4>About Us</h4>
                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore</p>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-12">
                                <div class="footer_copyright_part">Copyright © 2022 All Rights Reserved.</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div id="bottom_backto_top"><a href="#"></a></div>
            </div>

            <script src="scripts/jquery-3.4.1.min.js"></script>
            <script src="scripts/chosen.min.js"></script>
            <script src="scripts/slick.min.js"></script>
            <script src="scripts/rangeslider.min.js"></script>
            <script src="scripts/magnific-popup.min.js"></script>
            <script src="scripts/jquery-ui.min.js"></script>
            <script src="scripts/mmenu.js"></script>
            <script src="scripts/tooltips.min.js"></script>
            <script src="scripts/color_switcher.js"></script>
            <script src="scripts/jquery_custom.js"></script>

            <div id="color_switcher_preview">
                <h2>Choose Your Color <a href="#"><i class="fa fa-gear fa-spin (alias)"></i></a></h2>
                <div>
                    <ul class="colors" id="color1">
                        <li><a href="#" class="stylesheet"></a></li>
                        <li><a href="#" class="stylesheet_1"></a></li>
                        <li><a href="#" class="stylesheet_2"></a></li>
                        <li><a href="#" class="stylesheet_3"></a></li>
                        <li><a href="#" class="stylesheet_4"></a></li>
                        <li><a href="#" class="stylesheet_5"></a></li>
                    </ul>
                </div>
            </div>
        </>
    )
}
export default ListHotel