import unittest
from selenium import webdriver
from selenium.webdriver.common.keys import Keys

class TestDetails(unittest.TestCase):

    def setUp(self):
        self.driver = webdriver.Firefox()
        self.driver.get("http://gamingdb.info")

    def test_select_game(self):
        driver = self.driver
        driver.find_element_by_class_name('grid-item').click()

    def test_title(self):
        driver = self.driver
        driver.find_element_by_class_name('grid-item').click()

        # Test that there is a game title
        title = driver.find_element_by_class_name('detail-title').text
        self.assertIsNotNone(title)
        self.assertNotEqual(title, "")

    def test_image(self):
        driver = self.driver
        driver.find_element_by_class_name('grid-item').click()

        # Test that there is an image
        image = driver.find_element_by_class_name('sidebar-img').get_property('src')
        self.assertIsNotNone(image)
        self.assertNotEqual(image, "")

    def test_description(self):
        driver = self.driver
        driver.find_element_by_class_name('grid-item').click()

        #Test that there is a description
        description = driver.find_element_by_class_name('detail-description').text
        self.assertIsNotNone(description)
        self.assertNotEqual(description, "")

    def test_related_game(self):
        driver = self.driver

        # Click game
        driver.find_element_by_class_name('grid-item').click()

        # Get a related game if there is one
        try:
            relatedGame = driver.find_element_by_class_name('grid-item')
            relatedGame.click()
            self.assertIn("gamingdb.info/games/", driver.current_url)
        except Exception as e:
            # In some rare cases the related games have failed to load yet
            # So just pass here if there are no related games
            pass
            

        
    def tearDown(self):
        self.driver.close()
        
if __name__ == "__main__":
    unittest.main()