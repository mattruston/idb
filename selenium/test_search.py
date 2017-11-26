import unittest
from selenium import webdriver
from selenium.webdriver.common.keys import Keys

class TestSearch(unittest.TestCase):

    def setUp(self):
        self.driver = webdriver.Firefox()
        self.driver.get("http://gamingdb.info")

    def test_hit_site(self):
        self.assertIn("gamingdb", self.driver.title)
        self.assertIn("gamingdb.info", self.driver.current_url)

    def test_empty_query(self):
        self.test_hit_site()
        driver = self.driver
        driver.find_element_by_class_name('search-bar-button').click()
        self.assertIn("gamingdb.info/search", self.driver.current_url)

    def test_query(self):
        self.test_hit_site()
        driver = self.driver
        driver.find_element_by_class_name('search-bar-input').send_keys("Mario")
        driver.find_element_by_class_name('search-bar-button').click()
        self.assertIn("gamingdb.info/search/Mario", self.driver.current_url)
        # Cycle through the tabs to make sure the expected amount of results appear
        tabs = driver.find_elements_by_css_selector("div.tab")
        tabs[0].click()
        assert len(driver.find_elements_by_css_selector('a.search-item-container')) > 0
        tabs[1].click()
        assert len(driver.find_elements_by_css_selector('a.search-item-container')) > 0
        tabs[2].click()
        assert len(driver.find_elements_by_css_selector('a.search-item-container')) == 0
        tabs[3].click()
        assert len(driver.find_elements_by_css_selector('a.search-item-container')) > 0
        
    def tearDown(self):
        self.driver.close()
        
if __name__ == "__main__":
    unittest.main()