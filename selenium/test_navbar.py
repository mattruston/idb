import unittest
from selenium import webdriver
from selenium.webdriver.common.keys import Keys

class TestNavBar(unittest.TestCase):

    def setUp(self):
        self.driver = webdriver.Firefox()
        self.driver.get("http://gamingdb.info")

    def test_hit_site(self):
        self.assertIn("gamingdb", self.driver.title)
        self.assertIn("gamingdb.info", self.driver.current_url)

    def test_game_nav(self):
        self.test_hit_site()
        driver = self.driver
        driver.find_element_by_link_text("Games").click()
        self.assertIn("gamingdb.info/games", driver.current_url)
        driver.back()
        self.test_hit_site()

    def test_dev_nav(self):
        self.test_hit_site()
        driver = self.driver
        driver.find_element_by_link_text("Developers").click()
        self.assertIn("gamingdb.info/developers", driver.current_url)
        driver.back()
        self.test_hit_site()

    def test_plat_nav(self):
        self.test_hit_site()
        driver = self.driver
        driver.find_element_by_link_text("Platforms").click()
        self.assertIn("gamingdb.info/platforms", driver.current_url)
        driver.back()
        self.test_hit_site()

    def test_char_nav(self):
        self.test_hit_site()
        driver = self.driver
        driver.find_element_by_link_text("Characters").click()
        self.assertIn("gamingdb.info/characters", driver.current_url)
        driver.back()
        self.test_hit_site()

    def test_about_nav(self):
        self.test_hit_site()
        driver = self.driver
        driver.find_element_by_link_text("About").click()
        self.assertIn("gamingdb.info/about", driver.current_url)
        driver.back()
        self.test_hit_site()

        
    def tearDown(self):
        self.driver.close()
        

if __name__ == "__main__":
    unittest.main()