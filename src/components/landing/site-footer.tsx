export default function SiteFooter() {
  return (
    <footer className="siteFooter" id="footer">
      <div className="pageContainer">
        <div className="footerTop">
          <div className="footerBrand">
            <a className="wordmark footerWordmark" href="#top">
              voltway<span>.</span>
            </a>
            <p>Charge anywhere. Go everywhere.</p>
          </div>
          <div className="footerLinks">
            <div>
              <span>Explore</span>
              <a href="#hardware">Home chargers</a>
              <a href="#network">Public network</a>
              <a href="#pricing">Pricing</a>
              <a href="#installation">Installation</a>
            </div>
            <div>
              <span>Support</span>
              <a href="#support">Help center</a>
              <a href="tel:18008658929">1-800-VOLTWAY</a>
              <a href="mailto:support@voltway.example">
                support@voltway.example
              </a>
            </div>
          </div>
        </div>
        <div className="footerBottom">
          <p>© 2026 Voltway Inc. · 1200 Brazos Street, Austin, Texas</p>
          <div>
            <span>24/7 network emergency support</span>
            <span>Voltway never sells your personal data.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
