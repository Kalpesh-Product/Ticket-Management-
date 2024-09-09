import { Avatar, Button, Dropdown, Navbar } from "flowbite-react";
import { Link, useParams } from "react-router-dom";
import { DarkThemeToggle } from "flowbite-react";
import logo from "../../images/WONO LOGO white TP.png";

export function NavBarMemberLoggedIn() {
  const params = useParams();

  return (
    <Navbar fluid rounded className="sticky top-0 z-50">
      <Navbar.Brand>
        <img src={logo} className="mr-3 h-6 sm:h-9" alt="Flowbite React Logo" />
        {/* <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
          BIZ Nest Project
        </span> */}
      </Navbar.Brand>
      <div className="flex md:order-2">
        {/* Dark theme Button */}
        <DarkThemeToggle />
        &nbsp; &nbsp; &nbsp;
        {/* [[[[]]]] */}
        {params.email && (
          <Dropdown arrowIcon={false} inline label={<Avatar rounded />}>
            <Dropdown.Header>
              {/* <span className="block text-sm">Bonnie Green</span> */}

              <span className="block truncate text-sm font-medium">
                {params.email}
              </span>
            </Dropdown.Header>
            <Dropdown.Item>Status: Available</Dropdown.Item>
            <Dropdown.Item>
              <Button size="xs">Mark as Unavailable</Button>
            </Dropdown.Item>
            {/* <Dropdown.Item as={Link} to="/change-password">
            Change Password
          </Dropdown.Item> */}
            <Dropdown.Divider />
            <Dropdown.Item as={Link} to="/logout-member">
              Log Out
            </Dropdown.Item>
          </Dropdown>
        )}
        {/* [[[[]]]] */}
        <Navbar.Toggle />
      </div>
      <Navbar.Collapse>
        <Navbar.Link as={Link} to={`/member-assigned-tickets/${params.email}`}>
          Assigned Tickets
        </Navbar.Link>

        <Navbar.Link as={Link} to={`/member-accepted-tickets/${params.email}`}>
          Accepted Tickets
        </Navbar.Link>

        {/* <Navbar.Link as={Link} to="/">
          Back
        </Navbar.Link> */}
      </Navbar.Collapse>
    </Navbar>
  );
}
