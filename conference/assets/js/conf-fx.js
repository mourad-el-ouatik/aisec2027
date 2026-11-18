/* AISEC 2027 — Conference pages · effects layer (vanilla JS) */
(function(){
'use strict';
const MAP_D="M43,617.3L43,616.4L44.3,611.3L44.5,609.7L44.4,608.4L44.4,607.6L45,606.7L45.1,606.3L45.1,605.9L45.1,605.5L45,605.3L44.7,604.9L44.5,604.7L44.7,604.2L44.8,603.2L45.5,601.7L45.7,600.3L45.9,599.5L49.3,592.5L50.5,591.3L50.7,591L50.7,590.7L51.1,589.9L51.3,589.7L51.9,589.4L52,589.1L52.6,588L52.9,587.4L53.6,587.1L53.9,587L54.1,586.8L54.4,586.8L54.7,586.9L55,587.1L55.4,587.5L58.9,586.1L59.6,585.5L60.1,584.8L60.6,583.9L61.8,579.9L61.9,579.2L62.2,578.9L63.8,577.2L64.2,576.7L64.6,574.4L64.7,571.5L64.9,570.7L65.3,569.4L65.5,568.9L66.2,568L66.2,567.6L66.1,567.3L66,567.1L66,566.7L66.1,566.4L66.3,565.8L66.4,565.6L66.6,565.5L67.3,565.4L68.1,565.2L69.1,564.2L70.2,563L70.5,562.3L70.7,561.6L70.9,560.8L70.9,560L70.6,559.2L69.9,559L68.6,559.4L68.9,558.7L69.5,557.6L69.7,557.2L71.2,555.8L71.4,555.6L73.8,549.9L74.1,549.4L74.5,549.3L74.9,548.8L76.3,546.3L76.8,544L77.2,543.4L77.6,542.6L78.8,540.6L80.4,538.7L80.5,538.5L81,538.1L81.2,537.9L81.5,537.5L81.6,536.8L81.7,536.4L82.2,535.6L82.7,535L83.1,534.3L83.3,533.4L83.3,531.8L83.2,531.2L82.9,530.4L83,530.2L83.1,529.9L82.6,530.2L82.6,530.6L82.7,531.1L82.6,531.6L82.4,531.8L81.6,532.4L81.2,532.6L80.9,532.6L80.5,532.5L80.3,532.6L79.7,533L79.4,533.5L79.1,533.9L78.7,535.1L78.2,535.8L78.2,536.1L78.1,536.5L77.7,537.2L77.7,537.5L77.4,537.9L76,539.3L75.4,539L75.6,538.4L76.3,537.5L76.6,537L77.7,534.8L79.7,532L79.9,531.4L80.4,530.8L80.9,530.2L83.3,528.2L84.4,527.8L85.7,526.9L86.1,526.5L87.2,526.4L88.1,525.9L88.7,525.1L89.3,524.3L90.5,522.8L91.5,521.4L92.8,520.5L93.2,520L93.5,519.3L93.7,518.9L96.7,516.5L98.5,514.6L100.7,511.1L101.5,510.2L102.5,509.3L103.1,508.9L103.8,508.5L104.5,508.3L105.9,508.1L106.5,507.7L107.7,506.8L107.7,506L107.7,505.8L108.1,505L108.8,504L109.6,503.4L110.5,502.9L111,502.4L111.5,501.7L111.9,499.4L112.6,497.3L112.9,495.6L113.3,494.6L113.4,494.1L113.4,493.5L113.3,493L113.1,492.5L113.4,491.9L113.1,491.7L113.4,491.2L113.5,490.6L113.6,490L113.6,489.4L113.6,488.9L113.3,488.1L113.1,487.6L113.3,484.5L113,483.6L114,479.4L114.2,478.9L115.1,475.2L116.6,473.2L117.1,472.7L117.3,472.4L118.3,470.1L118.5,468.5L118.6,468.3L118.8,467.6L119.1,466.5L120.4,463.2L122.8,459.7L123.6,458.1L123.9,457.6L124,456.9L124.4,455.3L124.7,454.9L124.6,454.2L124.9,452.2L124.8,451.7L124.6,450.6L124.7,450.2L124.9,449.9L125.2,448.8L125.4,448.4L127.2,446L127.5,445.8L129.1,445.4L130.8,444.5L133.5,441.8L134,441.2L134.2,440.6L134.7,440.1L135.4,439.8L139,439.4L139.6,439.1L143,437.3L148.8,433.1L152.7,430.5L154.7,428.3L156.6,424.4L157.3,422.5L157.9,419.5L158.8,417.4L159.8,412.8L160.4,411.4L163.1,407.4L163.1,407.2L162.9,406.9L162.9,406.7L163.3,406.4L165.1,402.3L166.1,398.6L166.1,397.8L166.4,397.1L166.9,395.8L167.1,395.1L167.1,394.9L167.3,394.3L167.6,393.9L168.6,393.4L169.6,392.6L170.8,392.2L171.4,391.6L172.8,389.3L173.5,386.6L173.8,385.9L174.4,385.4L175,385L178,383.9L183.8,382.8L188.6,382.9L194.3,381L203.2,379.5L203.5,379.2L204.2,378.5L204.4,378.4L205,378.2L212.2,375.1L221.8,370.8L222.8,370L223.7,369L224.9,366.8L225.4,366.3L226,365.8L226.5,365.1L226.7,364.4L226.9,363.8L228.9,362.5L230.4,360.7L230.6,360.1L232,359.2L232.3,359L232.5,358.5L232.7,358.2L233.8,357.4L233.9,357.2L234.6,356.1L235.4,355.1L236,354.7L245.2,350L247.4,348.5L250.1,347.1L251.3,346.3L255.2,342.6L258.6,337.4L259.5,336.4L260.1,335.9L261.3,335.4L261.9,334.9L262.6,333.6L263.4,332.6L263.8,331.9L264,331.2L264.1,330.9L265.2,330L265.5,329.9L265.7,329L267.1,327L267.2,326.6L267.3,325.8L267.6,325L267.8,324.3L268.1,323.7L269.7,322.3L269.9,321.8L270.1,321.2L271.5,319.4L275.7,314.8L279,308.9L281.1,304.1L281.3,302.7L281.9,297.9L282.5,295.4L282.6,294.6L282.5,293.6L282.1,293.2L281.5,292.8L281.1,292.2L280.6,291.6L279.8,289.7L279.6,288.4L279.3,288.3L279,288.2L278.6,288.1L278.3,287.8L277.7,286.8L275.4,285.3L274.7,285.2L274,285L273.5,284.5L273.5,283L274.2,281.6L275,280.3L275.7,279.1L275.8,278.2L276,277.8L275.8,277.4L275.6,277.1L275.6,276.8L275.6,276.5L275.7,276.1L275.5,268.7L275.4,268L274.8,266.7L275.3,265.8L276.1,260.4L276.1,258.2L276,257.3L275.6,256.9L275.3,256.5L274.8,256L275.8,254.7L276.5,253.4L277.3,251.1L277.7,250.6L278.3,250L278.5,249.8L278.6,249.1L279.1,248.6L279.3,248.2L279.8,247.5L279.9,247.2L280.4,244.1L280.6,243.6L283.6,240.3L284.9,238.5L285.2,238.2L285.6,237.8L285.8,237.6L286.1,237.2L286.4,236.5L286.5,236.2L290.4,232.3L290.7,231.5L291,230.9L291.4,229.4L291.4,228.8L291.6,228.3L292.7,226.8L293.2,225.8L293.5,224.6L293.7,220.7L293.5,220.5L293,220.2L292.7,219.9L292.8,219.1L293.1,218.5L293.9,216.7L294.1,216L294.2,215.2L294,214.6L293.7,214.2L293.4,213.7L293.2,213L293.2,212.4L293.8,211.2L298.5,207.1L302.3,202.7L305.4,200.5L306.5,199.5L310.2,194.5L314.3,190L314.5,189.6L314.5,189.1L314.5,188.2L314.7,187.7L317.4,184.5L317.8,184.4L318,184.5L318.3,184.8L318.6,184.9L319.4,184.9L320,184.7L321.1,184.1L322.3,183.2L324.2,180.8L325.3,179.8L326.7,179.3L331.2,178.3L334.2,176.9L335.8,176.2L337.3,175.8L338,175.5L338.7,174.5L339.5,174.2L341.8,173.6L343,172.8L343.6,172.7L344.2,172.4L344.8,171.7L345.4,171.2L345.9,171.4L346.3,171.1L346.6,171.2L347,171.3L347.3,171.4L347.6,171.3L348.2,170.9L349.1,170.7L349.8,170.5L350.4,170.1L350.8,169.8L351.9,168.4L352.8,167.9L353.7,166.8L354.4,166.5L354.2,166.9L354.8,167.1L355.5,166.9L355.8,166.6L358.3,165L359.5,163.9L360.6,163.2L362,162.8L363.2,162.6L363.6,162.4L364.7,161.5L365.9,161.1L369.2,158.3L372.6,154.6L375.5,149.8L377.6,145.2L381.2,139.8L381.6,139.2L382,137.6L382.9,136.4L389.8,121.6L392.6,112L398.5,97L398.7,96.3L398.7,95.3L398.8,94.8L399.5,93.1L400.2,91L400.3,90.7L400.4,90.3L400.8,89.7L400.9,89.3L401.1,87.4L401.4,86.5L401.6,85.9L402.2,85.3L403.4,85.1L406.4,85.5L406.7,85.4L407.6,84.5L408,84.3L408.6,83.9L409.2,83.8L409.5,84L410.1,83.7L410.9,83.7L411.7,83.9L412.2,84.3L414.2,83.1L414.7,82.6L415.8,81.3L416.4,80.8L417.1,80.4L417.3,80.4L417.6,80.6L417.9,80.8L418.3,80.8L418.4,80.5L418.4,80.1L418.5,80.1L418.7,80.1L419,81.1L419.4,81.9L419.9,82.6L420.6,83.2L420.5,83.9L420.6,84.8L421.1,86.9L421.2,88.6L421.3,89L421.5,89.4L421.8,89.7L422,89.8L422.5,89.6L422.7,89.7L422.7,89.9L422.7,90.5L422.7,90.8L423.2,92.9L423.5,93.7L424.2,94.3L425.6,95.4L426.8,96.4L429.4,100.4L429.9,100.7L430.7,100.9L431.3,101.1L432,101.5L433.1,102.5L434,103.8L434.6,104.5L436,104.9L437.7,106.6L439,107.4L443.7,108.8L448,109.8L451.8,110.9L452.7,111L453.4,110.8L455.3,109.6L459.7,108.8L462.4,107.6L465.2,107L466.6,106.3L466.9,106.8L466.8,106.9L466.4,107.1L466.2,107.2L466.4,107.5L466.6,107.8L467.1,108.4L467.5,108.6L468.2,108.7L469.2,108.8L469.7,108.7L470.8,108.6L471.6,108.2L471.8,107.6L472.2,106.5L472.8,105.7L473.7,105.4L474.5,105.5L475.1,105.9L476.5,107.2L477.2,107.7L479.6,108L480.5,108.6L480.9,108.6L481.3,108.5L481.6,108.5L482,108.6L482.7,109L482.9,109.1L484.6,109.2L485.9,108.9L490,107.5L490.7,107L492.1,105.5L492.5,105.3L492.8,105.3L493,105.4L493.4,105.5L493.8,105.5L494.9,104.5L496.1,101.3L497,100.1L496.9,99.6L497,99.3L497.3,99.2L497.7,99.4L497.8,99.7L497.7,100.5L497.8,100.9L497.5,102.1L497.9,103.6L498,103.8L498,103.9L497.3,104.5L497.5,105.5L498.2,106.3L499.1,105.9L499.6,106.6L499.3,106.9L499.2,107.6L499.1,108.2L499.2,109.5L499.4,110L499.7,110.5L500.1,111.1L501,111.7L502.1,112.1L504.4,112.3L503.1,111.2L500.6,108.3L500.1,107.5L500.3,107.1L500.7,107.5L502.2,109.2L502.5,109.6L504.1,111.2L505.4,112L507.1,112.6L510.5,113.1L511.9,113L512.7,112.8L513.2,112.4L513.9,111.6L514.6,111.2L515.2,111L518.3,112.2L519,112.3L519.7,112.6L520.6,113L521.5,113.4L521.6,114.9L521.8,116L522.4,116.8L523.4,117.1L524.6,118L525.6,119L526.7,119.6L528.1,119.8L528.6,120.1L528.7,120.6L528.7,121.1L528.9,121.7L529.4,122.2L531,123.3L532.2,124.3L535.5,126.5L536.1,127.1L536,127.4L535.5,127.7L534.8,129.5L533.1,132.1L532.9,132.8L536.7,136.8L537.9,137.2L538.2,137.4L534.8,141.5L536,143.1L536.8,144.8L539.2,152L539.3,152.6L539.4,153L539.3,153.8L537.8,160.1L537.6,161.9L538,163.8L538.3,165L538.2,165.4L538,166L537.6,166.4L537.3,166.7L537.1,167.1L536.8,167.7L537.1,168.4L537.5,168.7L538.7,169.1L539.3,169.5L539.6,169.9L541,173.5L541.2,174.7L540.8,175.8L540.3,176.6L539.7,178.7L539.3,179.7L538.9,180.7L538.9,184.5L539.2,185.7L540.9,187.4L541.5,188.5L541.8,189.6L542.5,190.6L543.3,191.4L544.3,192.1L544.9,192.6L545.1,193.4L545.1,194.3L545,195.2L544.9,195.6L544.7,195.9L544.5,196.2L544.3,196.5L543,197.5L547.3,204.9L548.4,205.8L550.5,206.6L559.5,213.5L560,214.4L558.1,216.5L557.1,217.3L555.8,217.8L554.5,218L553.9,218.3L553.5,219L553.1,219.6L552.7,221L552.2,224.6L552.1,225L552.1,225.3L552.1,225.7L551.8,226L551.6,226.2L551.1,226.7L551,226.9L551.1,227.5L551.6,227.5L552.9,227.1L553.5,227.1L554.2,227.3L554.6,227.7L554.9,228.5L554.2,229.9L552.9,230.2L550.5,230L550.2,230L549.4,230L548.2,230L546.6,229.9L544.6,229.8L542.4,229.7L540,229.6L537.3,229.5L534.5,229.3L531.7,229.2L528.8,229L526,228.9L523.3,228.8L520.8,228.7L518.4,228.6L516.4,228.4L512,228.2L506.2,229.9L500.1,230.4L498.3,231.5L500.5,237.4L501.9,241.1L496.2,242L489.2,244.1L479.8,245.7L478.6,245.9L477.2,245.5L475,246.7L474.5,256.5L472.2,256.7L470.3,258L470,258.5L469.9,259.2L470,262.1L470,262.9L469.3,264.1L469,264.8L469.2,265.5L469.5,265.8L470.1,265.8L470.7,265.6L471.6,264.7L472.1,264.4L472.7,264.6L473.1,265.1L474.1,266.5L474.6,267.1L475.8,267.6L476.1,267.9L476.4,268.6L476.6,269.3L476.6,270L478.4,272.9L476.6,275.8L475,277.4L475.2,279.7L475.4,282.1L469.3,285.3L463.9,286.6L458.9,286.8L455.1,287.9L451.9,289.8L448.3,294.4L443.8,298.1L439,300.2L435.6,302L432.9,304.1L429.3,307.3L426,309.6L422.8,313L420.5,317.4L417.6,322.1L414.2,326.5L411,327.6L408.3,326.5L407.2,323.1L403.1,323.7L399.3,324.5L395.2,324.5L390.4,324.5L385.9,325L381.1,326.3L376.7,326.8L373.9,329.4L368.3,327.1L364.7,326.8L362.1,327.1L358.5,328.6L355.6,331.7L351.9,331.6L351.3,331.8L350.5,331.9L349.8,331.9L348.4,331.6L346.9,331.5L345.8,332L343.8,334.1L343.3,334.4L341.8,335.3L339.8,337.1L336.4,339.4L333.4,342.3L332.3,343L328.7,344.6L326.5,346.1L324.3,348.2L323.8,348.5L322.7,349.1L322.2,349.4L321,351.4L320.7,351.8L319.2,352.6L317.8,353.8L313.6,356.1L313,356.6L312.6,357.3L312.5,358.3L312.5,360L312.5,362.2L312.5,364.4L312.5,366.6L312.5,368.8L312.5,371L312.5,373.2L312.5,375.4L312.5,377.6L312.5,379.8L312.5,382L312.5,384.2L312.5,386.4L312.5,388.6L312.5,390.8L312.5,392.9L312.5,395.2L312.5,398.6L312.5,402L312.5,405.4L312.5,408.9L312.5,409.4L312.5,410.8L312.5,413L312.5,415.8L312.5,419.2L312.5,422.9L312.5,427L312.5,431.1L312.5,435.3L312.5,439.3L312.5,443L312.5,446.4L312.5,449.2L312.5,451.4L312.5,452.8L312.5,453.3L312.5,454.9L312.3,455.4L311.7,455.6L308.9,455.6L305.6,455.6L302.4,455.6L299.1,455.6L295.9,455.6L292.6,455.6L289.3,455.6L286.1,455.6L282.8,455.6L279.6,455.6L276.3,455.6L273.2,455.6L269.9,455.6L266.6,455.6L263.4,455.6L260.1,455.6L256.9,455.6L253.6,455.6L250.3,455.6L247.1,455.6L243.8,455.6L240.5,455.6L237.3,455.6L234,455.6L230.8,455.6L227.5,455.6L224.2,455.6L221,455.6L217.7,455.6L214.5,455.6L211.2,455.6L207.9,455.6L204.7,455.6L204.7,458.3L204.7,461L204.7,463.7L204.7,466.4L204.7,469.2L204.7,471.8L204.7,474.6L204.7,477.3L204.7,480L204.7,482.7L204.7,485.4L204.7,488.1L204.7,490.8L204.7,493.5L204.7,496.2L204.7,498.9L204.7,501.6L204.7,504.3L204.7,506.9L204.7,509.6L204.7,512.3L204.7,515L204.7,517.7L204.7,520.4L204.7,523.1L204.7,525.8L204.7,528.4L204.7,531.1L204.7,533.8L204.7,536.4L204.7,539.1L204.7,541.8L204.7,544.6L204.6,545.8L204.1,546.4L200.8,547.3L193.7,550.7L192.6,551L187.1,551.8L185.1,552.5L183.1,554L179.6,556.4L175.6,559.2L172.3,561.4L171.7,562.2L168.9,566.1L167.9,568.4L167.4,570.7L167.8,573L169.4,577.5L169.9,579.7L170.3,588.5L170.9,597.2L171.8,611.6L172,614.6L172.3,620.3L167.6,620.3L166.2,620.3L162.5,620.3L156.6,620.3L149,620.3L139.9,620.3L131,620.3L129.9,620.3L119.2,620.3L108,620.3L96.9,620.3L86.2,620.3L76.1,620.3L67.1,620.3L59.4,620.3L53.6,620.3L49.8,620.3L48.5,620.3L44.8,620.3L44.4,620.6L43.8,623.6L43.3,626.9L41.9,630.9L41.6,632L40.9,635.1L40.8,636.2L41.6,639.9L41.2,639L40.1,637.5L40,636.6L40.1,636.1L40.5,635.3L40.5,634.8L40.5,633.1L40.6,632.6L41.2,630.8L42.6,620.4L42.8,619.2L42.9,618.7Z";
const DK={x:77.1,y:537.9};
const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
const fine=matchMedia('(hover:hover) and (pointer:fine)').matches;
const $=(s,c=document)=>c.querySelector(s),$$=(s,c=document)=>[...c.querySelectorAll(s)];
const clamp=(v,a,b)=>Math.min(b,Math.max(a,v));
const mapSvg=(cls,extra='')=>`<svg class="${cls}" viewBox="0 0 600 720" aria-hidden="true"><path class="f" d="${MAP_D}"/><path class="o" pathLength="1" d="${MAP_D}"/>${extra}<circle class="d" cx="${DK.x}" cy="${DK.y}" r="5"/></svg>`;

/* 1 — preloader: Morocco traced in gold (short on repeat visits) */
function preloader(){
  const pre=$('#preloader');if(!pre)return;
  let seen=false;try{seen=sessionStorage.getItem('aisec2027-conf-seen')==='1'}catch(e){}
  const t=seen?.55:1.5;
  pre.style.setProperty('--trace',t+'s');
  pre.innerHTML=`<div class="cf-pre">${mapSvg('')}</div><div class="cf-pre-label">AISEC 2027 // DAKHLA</div>`;
  const min=Math.round(t*1000)+(seen?100:350);
  let loaded=document.readyState==='complete',waited=false;
  const go=()=>{if(!(loaded&&waited))return;pre.classList.add('hidden');try{sessionStorage.setItem('aisec2027-conf-seen','1')}catch(e){}setTimeout(()=>pre.remove(),900);document.dispatchEvent(new Event('conf:ready'))};
  setTimeout(()=>{waited=true;go()},min);
  if(!loaded)addEventListener('load',()=>{loaded=true;go()});
  setTimeout(()=>{loaded=true;waited=true;go()},4500);
}

/* 2 — chrome: progress bar, cursor, CTA link, page transition */
function chrome(){
  const bar=document.createElement('div');bar.className='fx-progress';document.body.appendChild(bar);
  const wipe=document.createElement('div');wipe.className='fx-wipe';document.body.appendChild(wipe);
  const upd=()=>{const max=document.documentElement.scrollHeight-innerHeight;bar.style.transform=`scaleX(${max>0?scrollY/max:0})`};
  addEventListener('scroll',upd,{passive:true});addEventListener('resize',upd);upd();
  $$('.nav-links a[href$="registration.html"]').forEach(a=>a.classList.add('nav-cta'));
  addEventListener('pageshow',e=>{if(e.persisted)document.body.classList.remove('is-leaving')});
  if(!reduce)document.addEventListener('click',e=>{
    const a=e.target.closest('a[href]');
    if(!a||e.defaultPrevented||e.metaKey||e.ctrlKey||e.shiftKey||e.altKey||e.button!==0)return;
    const h=a.getAttribute('href');
    if(a.target==='_blank'||!h||h.startsWith('#')||/^(mailto:|tel:|https?:)/.test(h)||a.hasAttribute('download'))return;
    e.preventDefault();document.body.classList.add('is-leaving');setTimeout(()=>{location.href=a.href},430);
  });
  if(fine&&!reduce){
    const ring=document.createElement('div'),dot=document.createElement('div');
    ring.className='fx-cursor';dot.className='fx-cursor-dot';document.body.append(ring,dot);
    let x=-100,y=-100,rx=-100,ry=-100;
    addEventListener('mousemove',e=>{x=e.clientX;y=e.clientY;ring.classList.add('is-on');dot.classList.add('is-on')},{passive:true});
    document.addEventListener('mouseleave',()=>{ring.classList.remove('is-on');dot.classList.remove('is-on')});
    document.addEventListener('mouseover',e=>ring.classList.toggle('is-hover',!!e.target.closest('a,button,input,.speaker-card,.venue-card,.committee-item,.schedule-tab-btn')));
    (function loop(){rx+=(x-rx)*.18;ry+=(y-ry)*.18;ring.style.transform=`translate(${rx}px,${ry}px)`;dot.style.transform=`translate(${x}px,${y}px)`;requestAnimationFrame(loop)})();
  }
}

/* 3 — heroes: split title, sand, faint traced map, dunes */
function splitTitle(){
  const h=$('.page-title');if(!h)return;
  let i=0;h.setAttribute('aria-label',h.textContent.trim());
  (function walk(node){
    [...node.childNodes].forEach(n=>{
      if(n.nodeType===3){
        const frag=document.createDocumentFragment();
        n.textContent.split(/(\s+)/).forEach(w=>{
          if(!w)return;
          if(/^\s+$/.test(w)){frag.appendChild(document.createTextNode(' '));i++;return}
          const word=document.createElement('span');word.className='fx-word';word.setAttribute('aria-hidden','true');
          [...w].forEach(ch=>{const c=document.createElement('span');c.className='fx-char';c.style.setProperty('--c',i++);c.textContent=ch;word.appendChild(c)});
          frag.appendChild(word);
        });
        n.replaceWith(frag);
      }else if(n.nodeType===1&&!n.classList.contains('fx-word'))walk(n);
    });
  })(h);
  /* the coloured <span> keeps its outline style: let chars inherit the stroke */
}
function sand(host){
  if(reduce)return;
  const cv=document.createElement('canvas');cv.className='fx-sand';cv.setAttribute('aria-hidden','true');host.prepend(cv);
  const cx=cv.getContext('2d');let W,H,d,ps=[],on=true;
  const mk=init=>({x:init?Math.random()*W:-10,y:Math.random()*H,r:(Math.random()*1.5+.4)*d,vx:(Math.random()*1.1+.35)*d,vy:(Math.random()-.4)*.25*d,a:Math.random()*.5+.15,p:Math.random()*6,s:Math.random()<.08});
  const size=()=>{d=Math.min(devicePixelRatio||1,2);W=cv.width=host.clientWidth*d;H=cv.height=host.clientHeight*d;ps=Array.from({length:Math.round(clamp(host.clientWidth/16,24,90))},()=>mk(true))};
  size();addEventListener('resize',size);
  new IntersectionObserver(e=>{on=e[0].isIntersecting}).observe(host);
  (function loop(t){if(on){cx.clearRect(0,0,W,H);for(const q of ps){q.x+=q.vx+Math.sin(t/900+q.p)*.3;q.y+=q.vy+Math.cos(t/1300+q.p)*.2;if(q.x>W+10||q.y<-10||q.y>H+10)Object.assign(q,mk(false));cx.beginPath();cx.fillStyle=q.s?`rgba(40,224,208,${q.a*.7})`:`rgba(214,180,122,${q.a})`;cx.arc(q.x,q.y,q.r,0,6.283);cx.fill()}}requestAnimationFrame(loop)})(0);
}
function dunes(host){
  const wave=(amp,base,seg)=>{let p=`M0,${base} Q${seg/2},${base-amp} ${seg},${base}`;for(let x=seg*2;x<=2400;x+=seg)p+=` T${x},${base}`;return p};
  const a=wave(70,120,600),b=wave(45,140,300),w=document.createElement('div');
  w.className='fx-dunes';w.setAttribute('aria-hidden','true');
  w.innerHTML=`<svg class="d2" viewBox="0 0 2400 200" preserveAspectRatio="none"><path d="${b} L2400,200 L0,200 Z"/></svg><svg class="d1" viewBox="0 0 2400 200" preserveAspectRatio="none"><path d="${a} L2400,200 L0,200 Z"/><path d="${a}"/></svg>`;
  host.appendChild(w);
}
function heroes(){
  splitTitle();
  $$('.page-hero,#hero').forEach(h=>{
    sand(h);dunes(h);
    if(h.classList.contains('page-hero')&&!reduce){const w=document.createElement('div');w.innerHTML=mapSvg('fx-map');h.prepend(w.firstChild)}
  });
  const hero=$('#hero .hero-bg-img');
  if(hero&&!reduce)addEventListener('scroll',()=>{if(scrollY<innerHeight*1.2)hero.style.marginTop=(scrollY*.18)+'px'},{passive:true});
}

/* 4 — reveals, tilt, magnet, committees search */
function reveals(){
  $$('.fade-in').forEach(el=>{const s=[...el.parentElement.children].filter(c=>c.classList.contains('fade-in'));el.style.setProperty('--d',Math.min(s.indexOf(el),8))});
  const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');io.unobserve(e.target)}}),{threshold:.08});
  $$('.fade-in').forEach(el=>io.observe(el));
  /* stagger inside grids (not fade-in themselves) */
  $$('.committee-grid,.venue-grid,.dates-grid').forEach(g=>{
    [...g.children].forEach((c,i)=>{c.classList.add('fade-in');c.style.setProperty('--d',Math.min(i,8));io.observe(c)});
  });
}
function tilt(){
  if(!fine||reduce)return;
  $$('.speaker-card,.venue-card').forEach(el=>{
    el.classList.add('fx-tilt');const g=document.createElement('i');g.className='fx-glare';el.appendChild(g);
    el.addEventListener('mousemove',e=>{const r=el.getBoundingClientRect(),px=(e.clientX-r.left)/r.width,py=(e.clientY-r.top)/r.height;el.classList.add('is-tilting');el.style.transform=`perspective(800px) rotateY(${(px-.5)*9}deg) rotateX(${(.5-py)*9}deg) translateY(-4px)`;el.style.setProperty('--gx',px*100+'%');el.style.setProperty('--gy',py*100+'%')});
    el.addEventListener('mouseleave',()=>{el.classList.remove('is-tilting');el.style.transform=''});
  });
  $$('.btn-primary,.nav-cta').forEach(b=>{
    b.addEventListener('mousemove',e=>{const r=b.getBoundingClientRect();b.style.transform=`translate(${(e.clientX-r.left-r.width/2)*.18}px,${(e.clientY-r.top-r.height/2)*.28}px)`});
    b.addEventListener('mouseleave',()=>{b.style.transform=''});
  });
}
function committees(){
  const sub=$('.committee-sub');if(!sub)return;
  const inp=document.createElement('input');inp.type='search';inp.className='committee-search';inp.placeholder='SEARCH A NAME, UNIVERSITY OR COUNTRY…';inp.setAttribute('aria-label','Search committee members');
  sub.after(inp);
  inp.addEventListener('input',()=>{
    const q=inp.value.trim().toLowerCase();
    $$('.committee-item').forEach(i=>{i.classList.toggle('is-hidden',!!q&&!i.textContent.toLowerCase().includes(q))});
    $$('.committee-section').forEach(s=>{s.classList.toggle('is-empty',!!q&&!$$('.committee-item:not(.is-hidden)',s).length)});
  });
}

function boot(){preloader();chrome();heroes();reveals();tilt();committees()}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot);else boot();
})();
